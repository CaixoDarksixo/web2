import { Component, inject, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { IconFieldModule } from 'primeng/iconfield';
import { RequestService } from '../service/request.service';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { MessageModule } from 'primeng/message';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { DatePipe } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';

interface Request {
    id?: string;
    dataHora?: string;
    descricaoEquipamento?: string;
    descricaoProblema?: string;
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
    MessageModule,
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
                <p-button label="Nova Solicitação" icon="pi pi-plus" size="large" (click)="newRequestVisible = true;"/>
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
                        <p-button label="Solicitar" (click)="createRequest()" />
                    </div>
                </form>
            </p-dialog>
            <p-table 
                #dt1
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
                        <th class="mt-20 mb-8">ID</th>
                        <th class="mt-20 mb-8">Data/Hora de Abertura</th>
                        <th class="mt-20 mb-8">Descrição do Equipamento</th>
                        <th class="mt-20 mb-8">Estado</th>
                        <th class="mt-20 mb-8">Ações</th>
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

                            @else if (col.header === 'Data/Hora de Abertura') {
                                <td>
                                    {{ rowData[col.field] | date:'dd/MM/yyyy HH:mm' }}
                                </td>
                            }

                            @else if (col.header === 'Ações') {
                                <td style="width: 17%">
                                    
                                    <p-button label="Visualizar" icon="pi pi-eye" (onClick)="router.navigate(['/cliente/solicitacoes', rowData['id']], { state: { fromList: true } })" styleClass="p-button-text p-button-plain mr-2"></p-button>
                
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

export class Solicitacoes implements OnInit {
    private fb = inject(FormBuilder);
    requests!: Request[];
    cols!: Column[];
    newRequestVisible: boolean = false;
    categorias = [
        { label: 'Hardware', value: 'hardware' },
        { label: 'Software', value: 'software' },
        { label: 'Redes', value: 'redes' },
        { label: 'Outros', value: 'outros' }
    ];

    requestService = inject(RequestService);
    router = inject(Router);

    newRequestForm = this.fb.group({
        descricaoEquipamento: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
        descricaoProblema: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
        categoria: ['', [Validators.required]],
    });

    ngOnInit() {
        this.requestService.getRequests().subscribe((data: Request[]) => {
            this.requests = data;
            console.log(this.requests);
        });

        this.cols = [
            { field: 'id', header: 'ID' },
            { field: 'dataHora', header: 'Data/Hora de Abertura' },
            { field: 'descricaoEquipamento', header: 'Descrição do Equipamento' },
            { field: 'status', header: 'Status' },
            { field: 'Ações', header: 'Ações' }
        ];
    };

    createRequest() {
        if (this.newRequestForm.valid) {
            const newRequest = {
                descricaoEquipamento: this.newRequestForm.value.descricaoEquipamento,
                descricaoProblema: this.newRequestForm.value.descricaoProblema,
                categoria: this.newRequestForm.value.categoria,
                status: 'ABERTA',
                dataHora: new Date().toISOString()
            };
            this.requestService.createRequest(newRequest).subscribe((request) => {
                this.requests = [...this.requests, request];
                this.newRequestForm.reset();
                this.newRequestVisible = false;
            });
        }
    }

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