import { Component, inject } from '@angular/core';
import { TableModule } from 'primeng/table';
import { IconFieldModule } from 'primeng/iconfield';
import { OrderService } from '../service/order.service';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { MessageModule } from 'primeng/message';

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
    ButtonModule,
    TagModule,
    MessageModule
],
        template: `
    <div>
        <div class="card">
            <div class="flex justify-between items-center mb-4">
                <div class="font-semibold text-xl mb-4 mr-5">Minhas Solicitações</div>
                <p-button label="Nova Solicitação" icon="pi pi-plus" size="large"/>
            </div>
            <p-table 
                #dt1
                [columns]="cols" 
                [value]="orders"
                [paginator]="true"
                [rows]="8"
                tableLayout="auto" 
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
                        @for (col of columns; track col) {
                            @if (col.header === 'Status') {
                                <td>
                                    <p-tag [icon]="getIcon(rowData[col.field])" [value]="rowData[col.field]" [severity]="getSeverity(rowData[col.field])"/>
                                </td>
                            }

                            @else if (col.header === 'Ações') {
                                <td style="width: 17%">
                                    <p-button label="Visualizar" icon="pi pi-eye" styleClass="p-button-text p-button-plain mr-2"/>
                                    @if (rowData['status'] === 'ORÇADA') {
                                        <p-button label="Aprovar/Rejeitar" severity="warn" icon="pi pi-check-square" styleClass="p-button-text"/>
                                    }

                                    @else if (rowData['status'] === 'REJEITADA') {    
                                        <p-button label="Resgatar" severity="danger" icon="pi pi-reply" styleClass="p-button-text"/>
                                    }

                                    @else if (rowData['status'] === 'ARRUMADA') {    
                                        <p-button label="Pagar" severity="info" icon="pi pi-dollar" styleClass="p-button-text"/>
                                    }
                                </td>
                            }

                            @else {
                            <td>
                                {{ rowData[col.field] }}
                            </td>
                            }
                        }
                    </tr>
                </ng-template>
            </p-table>
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
            { field: 'id', header: 'ID' },
            { field: 'dataHora', header: 'Data/Hora de Abertura' },
            { field: 'descricao', header: 'Descrição do Equipamento' },
            { field: 'status', header: 'Status' },
            { field: 'Ações', header: 'Ações' }
        ];
    };

    getSeverity(status: string) {
        switch (status) {
            case 'APROVADA':
                return 'primary';

            case 'ARRUMADA':
                return 'info';

            case 'ORÇADA':
                return 'warn';

            case 'REJEITADA':
                return 'danger';

            case 'FINALIZADA':
                return 'success';

            default:
                return 'secondary';
        }
    };

    getIcon(status: string) {
        switch (status) {
            case 'APROVADA':
                return 'pi pi-check-circle';
            case 'ARRUMADA':
                return 'pi pi-cog';
            case 'ORÇADA':
                return 'pi pi-file';
            case 'REJEITADA':
                return 'pi pi-times-circle';
            case 'FINALIZADA':
                return 'pi pi-thumbs-up';
            default:
                return 'pi pi-info-circle';
        }
    }
}