import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

@Injectable({
    providedIn: 'root',
})

export class RequestService {
    http = inject(HttpClient);
    private readonly API = 'http://localhost:3000/solicitacoes';

    private statusIcons: Record<string, string> = {
        APROVADA: 'pi pi-check-circle',
        ARRUMADA: 'pi pi-cog',
        ORÇADA: 'pi pi-file',
        REJEITADA: 'pi pi-times-circle',
        REDIRECIONADA: 'pi pi-external-link',
        PAGA: 'pi pi-money-bill',
        FINALIZADA: 'pi pi-thumbs-up'
        };


    public getRequests(clienteId?: number, status?: string): Observable<any[]> {
        let url = this.API;
        const params: string[] = [];

        if (clienteId) params.push(`clienteId=${clienteId}`);
        if (status) params.push(`status=${status}`);

        if (params.length > 0) {
        url += `?${params.join('&')}`;
        }
        return this.http.get<any[]>(url).pipe(
            switchMap((requests: any[]) => {
            if (!requests.length) return of([]);
            const clienteIds = Array.from(new Set(requests.map(r => r.clienteId)));
            const clienteRequests = clienteIds.map(id =>
                this.http.get<any>(`http://localhost:3000/usuarios/${id}`)
            );
            return forkJoin(clienteRequests).pipe(
                map(clientes => {
                const clienteMap = Object.fromEntries(clientes.map(c => [c.id, c.nome]));
                return requests.map(r => ({
                    ...r,
                    clienteNome: clienteMap[r.clienteId] || ''
                }));
                })
            );
            })
        );
    }

    public getUserById(id: number): Observable<any> {
        return this.http.get<any>(`http://localhost:3000/usuarios/${id}`);
    }

    public getRequestById(id: number): Observable<any> {
        return this.http.get<any>(`${this.API}/${id}`);
    }

    public createRequest(request: {
        clienteId: number;
        status: string;
        categoria: string;
        dataHoraAbertura: string;
        descricaoEquipamento: string;
        descricaoProblema: string;
    }): Observable<any> {
        return this.http.post<any>(this.API, request);
    }

    public getHistory(id: number): Observable<any[]> {
        return this.http.get<any[]>(`${this.API}/${id}/historico`);
    }

    public getOrcamento(id: number): Observable<any> {
        return this.http.get<any>(`${this.API}/${id}/orcamento`);
    }

    public criarOrcamento(requestId: number, body: {
        funcionario: string;
        valor: number;
        observacao?: string;
    }): Observable<any> {
        return this.http.post<any>(`${this.API}/${requestId}/orcamento`, body);
    }

    public aprovarOrcamento(requestId: number, body: {
        clienteId: number;
    }): Observable<any> {
        return this.http.post<any>(`${this.API}/${requestId}/aprovar`, body);
    }

    public rejeitarOrcamento(requestId: number, body: {
        clienteId: number;
        motivo: string;
    }): Observable<any> {
        return this.http.post<any>(`${this.API}/${requestId}/rejeitar`, body);
    }

    public redirecionarSolicitacao(requestId: number, body: {
        fromFuncionarioId: number;
        toFuncionarioId: number;
        observacao?: string;
    }): Observable<any> {
        return this.http.post<any>(`${this.API}/${requestId}/redirecionar`, body);
    }

    public manutencao(requestId: number, body: {
        funcionarioId: number;
        observacao?: string;
    }): Observable<any> {
        return this.http.post<any>(`${this.API}/${requestId}/manutencao`, body);
    }

    public finalizar(requestId: number, body: {
        funcionarioId: number;
    }): Observable<any> {
        return this.http.post<any>(`${this.API}/${requestId}/finalizar`, body);
    }

    public pagar(requestId: number, body: {
        clienteId: number;
        valorPago: number;
    }): Observable<any> {
        return this.http.post<any>(`${this.API}/${requestId}/pagar`, body);
    }

    public rescueRequest(requestId: number, body: {
        clienteId: number;
    }): Observable<any> {
        return this.http.post<any>(`${this.API}/${requestId}/resgatar`, body);
    }

    public getFuncionarios(): Observable<any[]> {
        return this.http.get<any[]>(`http://localhost:3000/usuarios?roles=FUNCIONARIO`);
    }

    public getCategorias(): Observable<any[]> {
        return this.http.get<any[]>(`http://localhost:3000/categorias`);
    }

    public createCategoria(body: { nome: string; descricao?: string }): Observable<any> {
        return this.http.post<any>(`http://localhost:3000/categorias`, body);
    } 

    public updateCategoria(id: number, body: { nome: string; descricao?: string }): Observable<any> {
        return this.http.put<any>(`http://localhost:3000/categorias/${id}`, body);
    }

    public deleteCategoria(id: number): Observable<any> {
        return this.http.delete<any>(`http://localhost:3000/categorias/${id}`);
    }

    public getTagClass(status: string) {
        return ('p-tag-' + status
                            .normalize('NFD')
                            .replace(/[\u0300-\u036f]/g, '')
                            .replace(/ç/g, 'c')             
                            .toLowerCase())
        }

    public getIcon(status: string): string {
        return this.statusIcons[status] ?? 'pi pi-info-circle';
    }
    
}