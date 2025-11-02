import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import { Request } from '@/core/models/request.model';

@Injectable({
    providedIn: 'root',
})

export class RequestService {
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
    
    http = inject(HttpClient);
    
    //necessario ajuste quando integrar com backend
    public getRequests(clienteId?: number, status?: string): Observable<Request[]> {
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

    public getRequestById(id: number): Observable<Request> {
        return this.http.get<Request>(`${this.API}/${id}`);
    }

    public createRequest(payload: {
        clienteId: number,
        categoria: string,
        descricaoEquipamento: string,
        descricaoProblema: string
    }
    ): Observable<Request> {
        const newRequest: Request = {
            clienteId: payload.clienteId,
            status: 'ABERTA',
            categoria: payload.categoria,
            dataHoraAbertura: new Date().toISOString(),
            descricaoEquipamento: payload.descricaoEquipamento,
            descricaoProblema: payload.descricaoProblema,
        };
        return this.http.post<Request>(this.API, newRequest);
    }

    public getHistory(id: number): Observable<any[]> {
        return this.http.get<any[]>(`${this.API}/${id}/historico`);
    }

    public getOrcamento(id: number): Observable<any> {
        return this.http.get<any>(`${this.API}/${id}/orcamento`);
    }

    public criarOrcamento(
        requestId: number,
        funcionario: string,
        valor: number,
        observacao?: string,
    ): Observable<any> {
        const body = {
            funcionario,
            valor,
            observacao
        };
        return this.http.post<any>(`${this.API}/${requestId}/orcamento`, body);
    }

    public aprovarOrcamento(requestId: number, clienteId: Number): Observable<any> {
        return this.http.post<any>(`${this.API}/${requestId}/aprovar`, {clienteId});
    }

    public rejeitarOrcamento(requestId: number, clienteId: number, motivo: string): Observable<any> {
        const body = {
        clienteId,
        motivo
    };
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

    public finalizar(requestId: number, funcionarioId: number): Observable<any> {
        return this.http.post<any>(`${this.API}/${requestId}/finalizar`, {funcionarioId});
    }

    public pagar(requestId: number, clienteId: number, valorPago: number): Observable<any> {
        const body = {
            clienteId,
            valorPago
        };
        return this.http.post<any>(`${this.API}/${requestId}/pagar`, body);
    }

    public rescueRequest(requestId: number, clienteId: number): Observable<any> {
        return this.http.post<any>(`${this.API}/${requestId}/resgatar`, {clienteId});
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