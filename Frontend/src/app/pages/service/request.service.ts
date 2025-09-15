import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root',
})

export class RequestService {
    http = inject(HttpClient);

     private requests = [
            {
                "id": "1",
                "descricaoEquipamento": "Notebook Dell Inspiron 15",
                "descricaoProblema": "Não liga ao pressionar o botão de energia",
                "categoria": "Informática",
                "status": "FINALIZADA",
                "dataHora": "2025-09-01T10:30:00"
            },
            {
                "id": "2",
                "descricaoEquipamento": "Impressora HP LaserJet M227",
                "descricaoProblema": "Impressões saindo com manchas",
                "categoria": "Periféricos",
                "status": "ORÇADA",
                "dataHora": "2025-09-02T15:45:00"
            },
            {
                "id": "3",
                "descricaoEquipamento": "PC Desktop Lenovo ThinkCentre",
                "descricaoProblema": "Travamentos constantes e lentidão",
                "categoria": "Informática",
                "status": "APROVADA",
                "dataHora": "2025-09-03T09:10:00"
            },
            {
                "id": "4",
                "descricaoEquipamento": "Teclado Redragon",
                "descricaoProblema": "Teclas não respondem corretamente",
                "categoria": "Periféricos",
                "status": "ARRUMADA",
                "dataHora": "2025-09-04T18:20:00"
            },
            {
                "id": "5",
                "descricaoEquipamento": "Monitor IDK 22",
                "descricaoProblema": "Tela piscando durante o uso",
                "categoria": "Periféricos",
                "status": "REJEITADA",
                "dataHora": "2025-09-05T11:05:00"
            },
            {
                "id": "6",
                "descricaoEquipamento": "Mouse Logitech MX Master 3",
                "descricaoProblema": "Botão lateral não funciona",
                "categoria": "Periféricos",
                "status": "ABERTA",
                "dataHora": "2025-09-05T11:05:00"
            }
            ];


    public getRequests(clienteId?: number): Observable<any[]> {
        return this.http.get<any[]>(`http://localhost:3000/solicitacoes${clienteId ? `?clienteId=${clienteId}` : ''}`);
    }

    public getRequestById(id: number): Observable<any> {
        return this.http.get<any>(`http://localhost:3000/solicitacoes/${id}`);
    }

    public createRequest(request: any): Observable<any> {
        return this.http.post<any>('http://localhost:3000/solicitacoes', request);
    }

    public getTagClass(status: string) {
        return ('p-tag-' + status
                            .normalize('NFD')
                            .replace(/[\u0300-\u036f]/g, '')
                            .replace(/ç/g, 'c')             
                            .toLowerCase())
        }

    public getIcon(status: string) {
        switch (status) {
            case 'APROVADA':
                return 'pi pi-check-circle';
            case 'ARRUMADA':
                return 'pi pi-cog';
            case 'ORÇADA':
                return 'pi pi-file';
            case 'REJEITADA':
                return 'pi pi-times-circle';
            case 'REDIRECIONADA':
                return 'pi pi-external-link';
            case 'PAGA':
                return 'pi pi-money-bill';
            case 'FINALIZADA':
                return 'pi pi-thumbs-up';
            default:
                return 'pi pi-info-circle';
        }
    }
    
}