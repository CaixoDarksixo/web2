import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Request } from '@/core/models/request.model';
import { Orcamento } from '@/core/models/orcamento.model';
import { Funcionario } from '../models/funcionario.model';

@Injectable({
    providedIn: 'root',
})

export class RequestService {
    private readonly API = 'http://localhost:8080/servicos'; // LINK DA API

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
    
    public getRequests(filtros: { clienteId?: number, status?: string, funcionarioId?: number } = {}): Observable<Request[]> {
        let url = this.API;
        const params: string[] = [];

        if (filtros.clienteId) params.push(`clienteId=${filtros.clienteId}`);
        if (filtros.status) params.push(`estado=${filtros.status}`);
        if (filtros.funcionarioId) params.push(`funcionarioId=${filtros.funcionarioId}`);

        if (params.length > 0) {
            url += `?${params.join('&')}`;
        }
        return this.http.get<Request[]>(url);
    }

    public getRequestById(id: number): Observable<Request> {
        return this.http.get<Request>(`${this.API}/${id}`);
    }

    public createRequest(payload: {
        categoriaId: number,
        descricaoEquipamento: string,
        descricaoProblema: string
    }
    ): Observable<Request> {
        const newRequest: Request = {
            categoriaEquipamento: {id: payload.categoriaId},
            descEquipamento: payload.descricaoEquipamento,
            descDefeito: payload.descricaoProblema,
        };
        return this.http.post<Request>(this.API, newRequest);
    }

    public getHistory(id: number): Observable<any[]> {
        return this.http.get<any[]>(`${this.API}/historico/${id}`);
    }

    public getOrcamento(id: number): Observable<Orcamento> {
        return this.http.get<any>(`${this.API}/orcamento/${id}`);
    }

    public criarOrcamento(
        requestId: number,
        valor: number,
    ): Observable<Orcamento> {
        const body = {
            valor
        };
        return this.http.post<Orcamento>(`${this.API}/orcar/${requestId}`, body);
    }

    public aprovarOrcamento(requestId: number): Observable<Orcamento> {
        return this.http.post<Orcamento>(`${this.API}/aprovar/${requestId}`, null);
    }

    public rejeitarOrcamento(requestId: number, motivo: string): Observable<Orcamento> {
        const body = {
        descRejeicao: motivo
    };
        return this.http.post<Orcamento>(`${this.API}/rejeitar/${requestId}`, body);
    }

    public redirecionarSolicitacao(requestId: number, funcionarioId: number): Observable<Request> {
        return this.http.post<Request>(`${this.API}/redirecionar/${requestId}`, {funcionarioId});
    }

    public manutencao(requestId: number, manutencao: string, observacao: string): Observable<Request> {
        const body = {
            manutencao,
            observacao
        };

        return this.http.post<Request>(`${this.API}/manutencao/${requestId}`, body);
    }

    public finalizar(requestId: number, funcionarioId: number): Observable<any> {
        return this.http.post<any>(`${this.API}/finalizar/${requestId}`, {funcionarioId});
    }

    public pagar(requestId: number, valorPago: number): Observable<any> {
        const body = {
            valorPago
        };
        return this.http.post<any>(`${this.API}/pagar/${requestId}`, body);
    }

    public rescueRequest(requestId: number): Observable<any> {
        return this.http.post<any>(`${this.API}/resgatar/${requestId}`, null);
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