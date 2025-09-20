import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root',
})

export class RequestService {
    http = inject(HttpClient);

    private statusIcons: Record<string, string> = {
        APROVADA: 'pi pi-check-circle',
        ARRUMADA: 'pi pi-cog',
        ORÇADA: 'pi pi-file',
        REJEITADA: 'pi pi-times-circle',
        REDIRECIONADA: 'pi pi-external-link',
        PAGA: 'pi pi-money-bill',
        FINALIZADA: 'pi pi-thumbs-up'
        };


    public getRequests(clienteId?: number): Observable<any[]> {
        return this.http.get<any[]>(`http://localhost:3000/solicitacoes${clienteId ? `?clienteId=${clienteId}` : ''}`);
    }

    public getRequestById(id: number): Observable<any> {
        return this.http.get<any>(`http://localhost:3000/solicitacoes/${id}`);
    }

    public createRequest(request: any): Observable<any> {
        return this.http.post<any>('http://localhost:3000/solicitacoes', request);
    }

    public rescueRequest(id: number): Observable<any> {
        return this.http.post<any>(`http://localhost:3000/solicitacoes/${id}/resgatar`, "");
    }

    public getHistory(id: number): Observable<any[]> {
        return this.http.get<any[]>(`http://localhost:3000/solicitacoes/${id}/historico`);
    }

    public getOrcamento(id: number): Observable<any> {
        return this.http.get<any[]>(`http://localhost:3000/solicitacoes/${id}/orcamento`);
    }

    public aprovarOrcamento(requestId: number): Observable<any> {
        return this.http.post<any>(`http://localhost:3000/solicitacoes/${requestId}/aprovar`, "");
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