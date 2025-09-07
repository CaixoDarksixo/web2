import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root',
})

export class OrderService {

    public getOrders(): Observable<any[]> {
        const orders = [
            {
                "id": "1",
                "dataHora": "2025-09-01T10:30:00",
                "descricao": "Notebook Dell Inspiron 15",
                "status": "FINALIZADA"
            },
            {
                "id": "2",
                "dataHora": "2025-09-02T15:45:00",
                "descricao":  "Impressora HP LaserJet M227",
                "status": "ORÇADA"
            },
            {
                "id": "3",
                "dataHora": "2025-09-03T09:10:00",
                "descricao": "PC Desktop Lenovo ThinkCentre",
                "status": "APROVADA"
            },
            {
                "id": "4",
                "dataHora": "2025-09-04T18:20:00",
                "descricao": "Teclado Redragon",
                "status": "ARRUMADA"
            },
            {
                "id": "5",
                "dataHora": "2025-09-05T11:05:00",
                "descricao": "Monitor IDK 22",
                "status": "REJEITADA"
            },
            {
                "id": "6",
                "dataHora": "2025-09-05T11:05:00",
                "descricao": "Mouse Logitech MX Master 3",
                "status": "ABERTA"
            }
        ];
        return of(orders);
    }

    public getOrderById(id: number): Observable<any> {
        const order = { id, description: `Order ${id}`, status: 'Pending' };
        return of(order);
    }

    public createOrder(order: any): Observable<any> {
        return of({ ...order, id: Math.floor(Math.random() * 1000) });
    }
    
}