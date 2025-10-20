import { Component, inject, OnInit } from '@angular/core';
import { Table, TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { DatePipe } from '@angular/common';
import { RequestService } from '@/services/request.service';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';

interface Request {
    id?: number;
    clienteId: number;
    status: string;
    categoria: string;
    funcionarioAtualId?: number;
    dataHoraAbertura: string;
    descricaoEquipamento: string;
    descricaoProblema: string;
    descricaoManutencao?: string;
    orientacoesCliente?: string;
    dataHoraFechamento?: string;
    clienteNome?: string;
}

@Component({
    selector: 'visao-geral',
    standalone: true,
    imports: [
    TableModule,
    TagModule,
    DatePipe,
    ButtonModule,
    InputIconModule,
    IconFieldModule,
    InputTextModule
    ],
    template: ` 
    <div class="card">
        <div class="font-semibold text-xl mb-12">Visão Geral</div>
        <div class="flex justify-between items-center mb-8">
            <p-tag icon="pi pi-info-circle" value="Solicitações Abertas" class="p-tag-aberta big-tag"/>
            <p-iconfield iconPosition="left">
                <p-inputicon>
                    <i class="pi pi-search"></i>
                </p-inputicon>
                <input pInputText type="text" (input)="onGlobalFilter(dt1, $event)" pSize="large" class="w-full md:w-100" placeholder="Insira uma palavra-chave para buscar" />
            </p-iconfield>
        </div>
        <p-table 
                #dt1
                sortField="dataHoraAbertura" 
                [sortOrder]="1"
                [columns]="cols" 
                [value]="requests"
                [paginator]="true"
                [rows]="8"
                tableLayout="auto" 
                size="large" 
                [tableStyle]="{ 'min-width': '50rem' }" 
                class="request-table">
                <ng-template #header let-columns>
                    <tr class>
                        <th pSortableColumn="dataHoraAbertura" class="mt-20 mb-8">Data/Hora de Abertura <p-sortIcon field="dataHoraAbertura" /></th>
                        <th class="mt-20 mb-8">Descrição do Equipamento</th>
                        <th pSortableColumn="clienteNome" class="mt-20 mb-8">Cliente <p-sortIcon field="clienteNome" /></th>
                        <th class="mt-20 mb-8">Ação</th>
                    </tr>
                </ng-template>
                <ng-template #body let-rowData let-columns="columns">
                    <tr>
                        @for (col of columns; track col) {
                            @if (col.header === 'Status') {
                                <td>
                                    <p-tag [icon]="requestService.getIcon(rowData[col.field])" [value]="rowData[col.field]" [class]="requestService.getTagClass(rowData[col.field])"/>
                                </td>
                            }

                            @else if (col.header === 'Data/Hora de Abertura') {
                                <td>
                                    {{ rowData[col.field] | date:'dd/MM/yyyy HH:mm' }}
                                </td>
                            }

                            @else if (col.header === 'Ação') {
                                <td style="width: 15%">
                                    <p-button label="Realizar Orçamento" icon="pi pi-file" (click)="router.navigate(['/funcionario/solicitacoes/', rowData.id, 'orcamento'], { state: { fromList: true } })" styleClass="p-button-text"></p-button>
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
    </div>`
})
export class VisaoGeral implements OnInit {
    cols = [
        { field: 'dataHoraAbertura', header: 'Data/Hora de Abertura' },
        { field: 'descricaoEquipamento', header: 'Descrição do Equipamento' },
        { field: "clienteNome", header: 'Cliente' },
        { field: 'Ação', header: 'Ação' }
    ];

    requests!: Request[];

    requestService = inject(RequestService);
    router = inject(Router);

    ngOnInit() {
        this.requestService.getRequests(undefined, "ABERTA").subscribe((data: Request[]) => {
            this.requests = data;
        });
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

}
