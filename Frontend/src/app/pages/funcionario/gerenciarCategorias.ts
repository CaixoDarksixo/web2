import { Component, inject, OnInit } from '@angular/core';
import { Table, TableModule } from 'primeng/table';
import { RequestService } from '../service/request.service';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { MessageModule } from 'primeng/message';
import { FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

interface Categoria {
    id: number;
    nome: string;
}

@Component({
    selector: 'gerenciar-categorias',
    standalone: true,
    imports: [
    TableModule,
    ToolbarModule,
    ButtonModule,
    ConfirmDialogModule,
    DialogModule,
    InputTextModule,
    ReactiveFormsModule,
    MessageModule
    ],
    providers: [MessageService, ConfirmationService],
    template: ` 
    <p-dialog header="Nova Categoria" [modal]="true" [(visible)]="newCategoriaVisible" [style]="{ width: '50rem'}" [closable]="false">
        <form [formGroup]="newCategoriaForm" class="w-full">
            <label for="nome" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2 mt-4 after:ml-0.5 after:text-red-600 after:content-['*']" >Nome</label>
            <input fluid="true" pInputText id="text" placeholder="Insira o nome" class="w-full md:w-120 mb-2" formControlName="nome" />
            @if (newCategoriaForm.controls.nome.touched && newCategoriaForm.controls.nome.invalid) {
                <p-message severity="error" size="small" variant="simple">Informe o nome.</p-message>
            }

            <div class="flex justify-end gap-2 mt-4">
                <p-button label="Cancelar" severity="secondary" (click)="newCategoriaVisible = false; this.newCategoriaForm.reset()" />
                <p-button label="Criar" (click)="onCreate()" />
            </div>
        </form>
    </p-dialog>
    <div class="card">
        <div class="font-semibold text-xl mb-4">Gerenciar Categorias</div>
        <p-toolbar styleClass="mb-6">
            <ng-template #start>
                <p-button label="Novo" icon="pi pi-plus" severity="secondary" class="mr-2" (onClick)="newCategoriaVisible = true" />
                <p-button label="Editar" icon="pi pi-pencil" severity="secondary" outlined class="mr-2" [disabled]="!categoriasSelecionadas || categoriasSelecionadas.length != 1" />
                <p-button severity="secondary" label="Excluir" icon="pi pi-trash" outlined (onClick)="onExcluir()" [disabled]="!categoriasSelecionadas || !categoriasSelecionadas.length" />
            </ng-template>
        </p-toolbar>
        <p-table 
            [columns]="cols" 
            [value]="categorias" 
            [tableStyle]="{ 'min-width': '50rem' }"
            [(selection)]="categoriasSelecionadas"
            [rowHover]="true"
            dataKey="id"
            tableLayout="auto" 
            size="large" >
        <ng-template #header>
            <tr>
                <th style="width: 3rem">
                </th>
                <th>ID</th>
                <th>Nome</th>
            </tr>
        </ng-template>
        <ng-template #body let-rowData let-columns="columns">
        <tr>
            <td style="width: 3rem">
                <p-tableCheckbox [value]="rowData" />
            </td>
            @for (col of columns; track col) {
                <td>
                    {{ rowData[col.field] }}
                </td>
            }
        </tr>
        </ng-template>
    </p-table>
    </div>`
})
export class GerenciarCategorias implements OnInit {
    categorias!: Categoria[];
    categoria!: Categoria;
    requestService = inject(RequestService);
    messageService = inject(MessageService);
    confirmationService = inject(ConfirmationService);
    newCategoriaVisible: boolean = false;

    categoriasSelecionadas!: Categoria[] | null;

    private fb = inject(FormBuilder);

    newCategoriaForm = this.fb.group({
        nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]]
    });

    cols = [
        { field: 'id', header: 'ID' },
        { field: 'nome', header: 'Nome' }
    ];

    ngOnInit() {
        this.requestService.getCategorias().subscribe((data: Categoria[]) => {
            this.categorias = data;
        });
    }

    onCreate() {
        
    }

    onExcluir() {
        console.log(this.categoriasSelecionadas);
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete the selected products?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.categoriasSelecionadas = null;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Products Deleted',
                    life: 3000
                });
            }
        });
    }
}
