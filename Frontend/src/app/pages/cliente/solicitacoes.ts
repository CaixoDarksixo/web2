import { Component, inject, OnInit } from '@angular/core';
import { Table, TableModule } from 'primeng/table';
import { IconFieldModule } from 'primeng/iconfield';
import { RequestService } from '../service/request.service';
import { AuthService } from '../../pages/service/auth.service';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { MessageModule } from 'primeng/message';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { DatePipe } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { InputIconModule } from 'primeng/inputicon';
import { FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';

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
    MessageModule,
    InputIconModule,
    DialogModule,
    ReactiveFormsModule,
    InputTextModule,
    TextareaModule,
    SelectModule,
    DatePipe,
    RouterModule
],
        template: `
    <div>
        <div class="card">
            <div class="flex justify-between items-center mb-4">
                <div class="font-semibold text-xl mb-4 mr-5">Minhas Solicitações</div>
                <div class="flex gap-5">
                    <p-iconfield iconPosition="left" class="mb-8">
                        <p-inputicon>
                            <i class="pi pi-search"></i>
                        </p-inputicon>
                        <input pInputText type="text" (input)="onGlobalFilter(dt1, $event)" pSize="large" class="w-full md:w-100" placeholder="Insira uma palavra-chave para buscar" />
                    </p-iconfield>
                    <p-button label="Nova Solicitação" icon="pi pi-plus" size="large" (click)="newRequestVisible = true;"/>
                </div>
            </div>
            <p-dialog header="Nova Solicitação de Manutenção" [modal]="true" [(visible)]="newRequestVisible" [style]="{ width: '50rem'}" [closable]="false">
                <form [formGroup]="newRequestForm" class="w-full">
                    <label for="descricaoEquipamento" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2 mt-4 after:ml-0.5 after:text-red-600 after:content-['*']" >Descrição do Equipamento</label>
                    <input pInputText id="text" placeholder="Insira a descrição" class="w-full md:w-120 mb-2" fluid=true formControlName="descricaoEquipamento" />
                    @if (newRequestForm.controls.descricaoEquipamento.touched && newRequestForm.controls.descricaoEquipamento.invalid) {
                        <p-message severity="error" size="small" variant="simple">Descrição inválida.</p-message>
                    }

                    <label for="categoria" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2 mt-4 after:ml-0.5 after:text-red-600 after:content-['*']" >Categoria</label>
                    <p-select [options]="categorias" formControlName="categoria" class="w-full md:w-120 mb-2" placeholder="Selecione uma categoria"/>
                    @if (newRequestForm.controls.categoria.touched && newRequestForm.controls.categoria.invalid) {
                        <p-message severity="error" size="small" variant="simple">Selecione uma categoria.</p-message>
                    }

                    <label for="descricaoProblema" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2 mt-4 after:ml-0.5 after:text-red-600 after:content-['*']" >Descrição do Problema</label>
                    <textarea rows="3" pTextarea class="w-full md:w-120 mb-2" fluid=true [autoResize]="true" formControlName="descricaoProblema"></textarea>
                    @if (newRequestForm.controls.descricaoProblema.touched && newRequestForm.controls.descricaoProblema.invalid) {
                        <p-message severity="error" size="small" variant="simple">Descrição inválida.</p-message>
                    }

                    <div class="flex justify-end gap-2">
                        <p-button label="Cancelar" severity="secondary" (click)="newRequestVisible = false; this.newRequestForm.reset()" />
                        <p-button label="Solicitar" (click)="onCreate()" />
                    </div>
                </form>
            </p-dialog>
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
                        <th pSortableColumn="id" class="mt-20 mb-8">ID <p-sortIcon field="id" /></th>
                        <th pSortableColumn="dataHoraAbertura" class="mt-20 mb-8">Data/Hora de Abertura <p-sortIcon field="dataHoraAbertura" /></th>
                        <th class="mt-20 mb-8">Descrição do Equipamento</th>
                        <th pSortableColumn="status" class="mt-20 mb-8">Estado <p-sortIcon field="status" /></th>
                        <th class="mt-20 mb-8">Ações </th>
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

                            @else if (col.header === 'Ações') {
                                <td style="width: 15%">
                                    
                                    <p-button label="Visualizar" icon="pi pi-eye" (click)="router.navigate(['/cliente/solicitacoes', rowData.id], { state: { fromList: true } })" styleClass="p-button-text p-button-plain mr-2"></p-button>
                
                                    @if (rowData['status'] === 'ORÇADA') {
                                        <p-button class="block" label="Aprovar/Rejeitar Orçamento" icon="pi pi-check-square" (click)="router.navigate(['/cliente/solicitacoes', rowData.id, 'orcamento'], { state: { fromList: true } })" styleClass="p-button-text"/>
                                    }

                                    @else if (rowData['status'] === 'REJEITADA') {    
                                        <p-button class="block" (click)="onRescue(rowData['id'])" label="Resgatar" icon="pi pi-reply" styleClass="p-button-text"/>
                                    }

                                    @else if (rowData['status'] === 'ARRUMADA') {    
                                        <p-button class="block" label="Pagar" icon="pi pi-dollar" (click)="router.navigate(['/cliente/solicitacoes', rowData.id, 'pagar'], { state: { fromList: true } })" styleClass="p-button-text"/>
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

export class Solicitacoes implements OnInit {
    private fb = inject(FormBuilder);
    requests!: Request[];
    cols!: Column[];
    newRequestVisible: boolean = false;
    currentUser: any;
    categorias = [
        { label: 'Hardware', value: 'Hardware' },
        { label: 'Software', value: 'Software' },
        { label: 'Redes', value: 'Redes' },
        { label: 'Outros', value: 'Outros' }
    ];

    requestService = inject(RequestService);
    router = inject(Router);
    authService = inject(AuthService);

    newRequestForm = this.fb.group({
        descricaoEquipamento: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
        descricaoProblema: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
        categoria: ['', [Validators.required]],
    });

    ngOnInit() {
        this.authService.getAuthenticatedUser().subscribe(user => {
            this.currentUser = user;
            this.requestService.getRequests(this.currentUser.id).subscribe((data: Request[]) => {
                this.requests = data;
            });
        });


        this.cols = [
            { field: 'id', header: 'ID' },
            { field: 'dataHoraAbertura', header: 'Data/Hora de Abertura' },
            { field: 'descricaoEquipamento', header: 'Descrição do Equipamento' },
            { field: 'status', header: 'Status' },
            { field: 'Ações', header: 'Ações' }
        ];
    };
    
    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    onRescue(id: number) {
    this.requestService.rescueRequest(id, {clienteId: this.currentUser.id}).subscribe((updatedRequest) => {
        const index = this.requests.findIndex(r => r.id === updatedRequest.id);
        if (index > -1) {
            this.requests[index] = updatedRequest;
            this.requests = [...this.requests];
        }
    });
    }

    onCreate() {
        if (this.newRequestForm.valid) {
            const newRequest: Request = {
                clienteId: this.currentUser.id,
                status: 'ABERTA',
                categoria: this.newRequestForm.value.categoria!,
                dataHoraAbertura: new Date().toISOString(),
                descricaoEquipamento: this.newRequestForm.value.descricaoEquipamento!,
                descricaoProblema: this.newRequestForm.value.descricaoProblema!,
            };
            this.requestService.createRequest(newRequest).subscribe((request) => {
                this.requests = [...this.requests, request];
                this.newRequestForm.reset();
                this.newRequestVisible = false;
            });
        }
    }
}