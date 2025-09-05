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
                "descricao": "Pedido de notebooks",
                "status": "pendente"
            },
            {
                "id": "2",
                "dataHora": "2025-09-02T15:45:00",
                "descricao": "Compra de acessórios de informática",
                "status": "em processamento"
            },
            {
                "id": "3",
                "dataHora": "2025-09-03T09:10:00",
                "descricao": "Solicitação de móveis para escritório",
                "status": "concluído"
            },
            {
                "id": "4",
                "dataHora": "2025-09-04T18:20:00",
                "descricao": "Reposição de materiais de limpeza",
                "status": "pendente"
            },
            {
                "id": "5",
                "dataHora": "2025-09-05T11:05:00",
                "descricao": "Encomenda de cadeiras ergonômicas",
                "status": "cancelado"
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