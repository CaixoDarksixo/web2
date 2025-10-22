import { Component, inject, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { DatePipe } from '@angular/common';
import { TruncatePipe } from '@/shared/pipes/truncate-pipe';
import { RequestService } from '@/core/services/request.service';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext'; 
import { AuthService } from '@/core/services/auth.service';
import { Table } from 'primeng/table';
import { SelectModule } from 'primeng/select'; 
import { FormsModule } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessageService } from 'primeng/api';

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
    selector: 'solicitacoes',
    standalone: true,
    imports: [
    TableModule,
    TagModule,
    DatePipe,
    TruncatePipe,
    ButtonModule,
    InputIconModule,
    IconFieldModule,
    InputTextModule,
    SelectModule,
    FormsModule,
    ConfirmDialogModule
    ],

    template: ` 
    <p-confirmDialog></p-confirmDialog>
    <div class="card">
        <div class="font-semibold text-xl mb-4">Visualizar Solicitações</div>
            <div class="flex justify-between mb-8">
                <p-iconfield iconPosition="left">
                    <p-inputicon>
                        <i class="pi pi-search"></i>
                    </p-inputicon>
                    <input pInputText type="text" (input)="onGlobalFilter(dt1, $event)" pSize="large" class="w-full md:w-100" placeholder="Insira uma palavra-chave para buscar" />
                </p-iconfield>
                <p-select [options]="filtros" optionLabel="label" optionValue="value" placeholder="Selecione um filtro"(onChange)="onFiltroChange($event)"></p-select>
            </div>

            <p-table 
                #dt1
                sortField="dataHoraAbertura" 
                [sortOrder]="1"
                [columns]="cols"
                [value]="requests"
                [paginator]="true"
                [rows]="8"
                rowHover="true"
                tableLayout="auto" 
                size="large" 
                [tableStyle]="{ 'min-width': '50rem' }" 
                class="request-table">
                <ng-template #header let-columns>
                    <tr class>
                        <th pSortableColumn="id" class="mt-20 mb-8">ID <p-sortIcon field="id" /></th>
                        <th pSortableColumn="dataHoraAbertura" class="mt-20 mb-8">Data/Hora de Abertura <p-sortIcon field="dataHoraAbertura" /></th>
                        <th class="mt-20 mb-8">Descrição do Equipamento</th>
                        <th pSortableColumn="clienteNome" class="mt-20 mb-8">Cliente <p-sortIcon field="clienteNome" /></th>
                        <th pSortableColumn="status" class="mt-20 mb-8">Estado <p-sortIcon field="status" /></th>
                        <th class="mt-20 mb-8">Ações </th>
                    </tr>
                </ng-template>
                <ng-template #body let-rowData let-columns="columns">
                    <tr>
                        @for (col of columns; track col) {
                            @if (col.header === 'Status') {
                                <td style="width: 10%">
                                    <p-tag [icon]="requestService.getIcon(rowData[col.field])" [value]="rowData[col.field]" [class]="requestService.getTagClass(rowData[col.field])"/>
                                </td>
                            }

                            @else if (col.header === 'Data/Hora de Abertura') {
                                <td>
                                    {{ rowData[col.field] | date:'dd/MM/yyyy HH:mm' }}
                                </td>
                            }

                            @else if (col.header === 'Ações') {
                                <td style="width: 15%">
                                    @if (rowData['status'] === 'ABERTA') {
                                        <p-button class="block" label="Realizar Orçamento" icon="pi pi-file" (click)="router.navigate(['/funcionario/solicitacoes/', rowData.id, 'orcamento'], { state: { fromList: true } })" styleClass="p-button-text"/>
                                    }

                                    @else if (rowData['status'] === 'APROVADA' || rowData['status'] === 'REDIRECIONADA') {    
                                        <p-button class="block" (click)="router.navigate(['/funcionario/solicitacoes/', rowData.id, 'manutencao'], { state: { fromList: true } })" label="Efetuar Manutenção" icon="pi pi-cog" styleClass="p-button-text"/>
                                    }

                                    @else if (rowData['status'] === 'PAGA') {    
                                        <p-button class="block" label="Finalizar Solicitação" icon="pi pi-thumbs-up" (click)="onFinalizar(rowData['id'])" styleClass="p-button-text"/>
                                    }
                                </td>
                            }

                            @else {
                            <td>
                                {{ rowData[col.field] | truncate:30 }}
                            </td>
                            }
                        }
                    </tr>
                </ng-template>
            </p-table>
    </div>`
})
export class Solicitacoes implements OnInit {
    requests!: Request[];
    newRequestVisible: boolean = false;
    currentUser: any;
    cols = [
            { field: 'id', header: 'ID' },
            { field: 'dataHoraAbertura', header: 'Data/Hora de Abertura' },
            { field: 'descricaoEquipamento', header: 'Descrição do Equipamento' },
            { field: 'clienteNome', header: 'Cliente' },
            { field: 'status', header: 'Status' },
            { field: 'Ações', header: 'Ações' }
        ];

    filtros = [
        { label: 'Todas', value: 'todas' },
        { label: 'Hoje', value: 'hoje' },
        { label: 'Selecionar período', value: 'periodo' }
    ];

    messageService = inject(MessageService);
    confirmationService = inject(ConfirmationService);
    requestService = inject(RequestService);
    router = inject(Router);
    authService = inject(AuthService);

    ngOnInit() {
        this.authService.getAuthenticatedUser().subscribe(user => {
            this.currentUser = user;
            this.requestService.getRequests(1).subscribe((data: Request[]) => {
                this.requests = data;
            });
        });
    }
    
    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    onFinalizar(requestId: number) {
         this.confirmationService.confirm({
            closable: true,
            closeOnEscape: true,
            message: 'Você tem certeza que deseja finalizar esta solicitação?',
            header: 'Confirmação',
            icon: 'pi pi-exclamation-triangle',
            rejectButtonProps: {
                label: 'Cancelar',
                severity: 'secondary',
                outlined: true,
            },
            acceptButtonProps: {
                label: 'Finalizar'
            },
            accept: () => {
                this.requestService.finalizar(requestId, {funcionarioId: this.currentUser.id}).subscribe((updatedRequest) => {
                    const index = this.requests.findIndex(r => r.id === updatedRequest.id);
                    if (index > -1) {
                        this.requests[index] = updatedRequest;
                        this.requests = [...this.requests];
                    }
                    this.messageService.add({
                        severity: 'info',
                        summary: 'Solicitação Finalizada',
                        detail: 'A solicitação foi finalizada com sucesso.',
                        life: 5000
                    });
                });
            }
        });
    }

    onFiltroChange(event: any) {
    const filtro = event.value;

    if (filtro === 'todas') {
        this.requestService.getRequests(1).subscribe((data: Request[]) => this.requests = data);
    }
    else if (filtro === 'hoje') {
        this.requests = this.requests.filter(req =>
        new Date(req.dataHoraAbertura).toDateString() === new Date().toDateString()
        );
    }
    else if (filtro === 'periodo') {
        console.log("Selecionar período");
    }
    }

}
