import { LayoutService } from './../../layouts/service/layout.service';
import { Component, inject } from '@angular/core';
import { Table, TableModule } from 'primeng/table';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIcon } from "primeng/inputicon";
import { AppTopbar } from '../../layouts/component/app.topbar';
import { AppFloatingConfigurator } from '../../layouts/component/app.floatingconfigurator';
import { OrderService } from '../service/order.service';

interface Order {
    id?: string;
    dataHora?: string;
    descricao?: string;
    status?: string;
}

interface Column {
    field: string;
    header: string;
}

@Component({
    selector: 'app-solicitacoes',
    standalone: true,
    imports: [
    TableModule,
    IconFieldModule,
    InputIcon,
    AppFloatingConfigurator,
    AppTopbar
],
        template: `
<div>
    <app-topbar></app-topbar>
    <div class="bg-surface-50 dark:bg-surface-950 flex items-center justify-center min-h-screen w-full overflow-hidden">
        <div class="card">
            <div class="font-semibold text-xl mb-4">Minhas Solicitações</div>
            <p-table 
                #dt1
                [columns]="cols" 
                [value]="orders" 
                size="large" 
                [tableStyle]="{ 'min-width': '50rem' }" 
                class="order-table">
                <ng-template #header let-columns>
                    <tr class>
                        @for (col of columns; track col.header) {
                            <th class="mt-20 mb-8">{{ col.header }}</th>
                        }
                    </tr>
                </ng-template>
                <ng-template #body let-rowData let-columns="columns">
                    <tr>
                        @for (col of columns; track col.field) {
                            <td>
                                {{ rowData[col.field] }}
                            </td>
                        }
                    </tr>
                </ng-template>
            </p-table>
        </div>
    </div>
</div>
            `
})

export class Solicitacoes {
    orders!: Order[];
    cols!: Column[];

    orderService = inject(OrderService);

    ngOnInit() {
        this.orderService.getOrders().subscribe((data) => {
            this.orders = data;
            console.log(this.orders);
        });

        this.cols = [
            { field: 'dataHora', header: 'Data e Hora' },
            { field: 'descricao', header: 'Descrição' },
            { field: 'status', header: 'Status' }
        ];
    }
}
