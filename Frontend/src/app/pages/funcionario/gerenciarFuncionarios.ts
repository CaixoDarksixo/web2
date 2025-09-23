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
import { DatePipe } from '@angular/common';

interface Funcionario {
    id: number;
    nome: string;
    email: string;
}

@Component({
    selector: 'gerenciar-funcionarios',
    standalone: true,
    imports: [
    TableModule,
    ToolbarModule,
    ButtonModule,
    ConfirmDialogModule,
    DialogModule,
    InputTextModule,
    ReactiveFormsModule,
    MessageModule,
    DatePipe
    ],
    providers: [MessageService, ConfirmationService],
    template: `
    <p-dialog header="Novo Funcionário" [modal]="true" [(visible)]="newFuncionarioVisible" [style]="{ width: '50rem'}" [closable]="false">
        <form [formGroup]="newFuncionarioForm" class="w-full">
            <label for="email1" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2 after:ml-0.5 after:text-red-600 after:content-['*']" >E-mail</label>
            <input fluid="true" pInputText id="email1" type="email" placeholder="Insira o e-mail" class="w-full md:w-120 mb-2" formControlName="email" />
            @if (newFuncionarioForm.controls.email.touched && newFuncionarioForm.controls.email.invalid) {
                <p-message severity="error" size="small" variant="simple">Informe um email válido.</p-message>
            }

            <label for="nome" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2 mt-4 after:ml-0.5 after:text-red-600 after:content-['*']" >Nome</label>
            <input fluid="true" pInputText id="text" placeholder="Insira o nome" class="w-full md:w-120 mb-2" formControlName="nome" />
            @if (newFuncionarioForm.controls.nome.touched && newFuncionarioForm.controls.nome.invalid) {
                <p-message severity="error" size="small" variant="simple">Informe seu nome.</p-message>
            }

            <label for="senha" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2 mt-4 after:ml-0.5 after:text-red-600 after:content-['*']" >Senha</label>
            <input fluid="true" pInputText id="senha" type="password" placeholder="Insira a senha" class="w-full md:w-120 mb-2" formControlName="senha" />
            @if (newFuncionarioForm.controls.senha.touched && newFuncionarioForm.controls.senha.invalid) {
                <p-message severity="error" size="small" variant="simple">A senha deve ter entre 6 e 100 caracteres.</p-message>
            }

            <label for="dataNascimento" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2 mt-4 after:ml-0.5 after:text-red-600 after:content-['*']" >Data de Nascimento</label>
            <input fluid="true" pInputText id="dataNascimento" type="date" placeholder="Insira a data de nascimento" class="w-full md:w-120 mb-2" formControlName="dataNascimento" />
            @if (newFuncionarioForm.controls.dataNascimento.touched && newFuncionarioForm.controls.dataNascimento.invalid) {
                <p-message severity="error" size="small" variant="simple">Informe uma data de nascimento válida.</p-message>
            }

            <div class="flex justify-end gap-2 mt-4">
                <p-button label="Cancelar" severity="secondary" (click)="newFuncionarioVisible = false; this.newFuncionarioForm.reset()" />
                <p-button label="Criar" (click)="onCreate()" />
            </div>
        </form>
    </p-dialog>
    <div class="card">
        <div class="font-semibold text-xl mb-4">Gerenciar Categorias</div>
        <p-toolbar styleClass="mb-6">
            <ng-template #start>
                <p-button label="Novo" icon="pi pi-plus" severity="secondary" class="mr-2" (onClick)="newFuncionarioVisible = true" />
                <p-button label="Editar" icon="pi pi-pencil" severity="secondary" outlined class="mr-2" [disabled]="!funcionariosSelecionados || funcionariosSelecionados.length != 1" />
                <p-button severity="secondary" label="Excluir" icon="pi pi-trash" outlined (onClick)="onExcluir()" [disabled]="!funcionariosSelecionados || !funcionariosSelecionados.length" />
            </ng-template>
        </p-toolbar>
        <p-table 
            [columns]="cols" 
            [value]="funcionarios" 
            [tableStyle]="{ 'min-width': '50rem' }"
            [(selection)]="funcionariosSelecionados"
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
                <th>E-mail</th>
                <th>Data de Nascimento</th>
            </tr>
        </ng-template>
        <ng-template #body let-rowData let-columns="columns">
        <tr>
            <td style="width: 3rem">
                <p-tableCheckbox [value]="rowData" />
            </td>
            @for (col of columns; track col) {
                @if (col.header === 'Data de Nascimento') {
                    <td>
                        {{ rowData[col.field] | date:'dd/MM/yyyy' }}
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
export class GerenciarFuncionarios {
    funcionarios!: Funcionario[];
    funcionario!: Funcionario;
    requestService = inject(RequestService);
    messageService = inject(MessageService);
    confirmationService = inject(ConfirmationService);
    newFuncionarioVisible: boolean = false;

    private fb = inject(FormBuilder);

    newFuncionarioForm = this.fb.group({
        nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
        email: [null, [Validators.required, Validators.email]],
        senha: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(100)]],
        dataNascimento: [null, [Validators.required]],
    });

    funcionariosSelecionados!: Funcionario[] | null;

    cols = [
        { field: 'id', header: 'ID' },
        { field: 'nome', header: 'Nome' },
        { field: 'email', header: 'E-mail' },
        { field: 'dataNascimento', header: 'Data de Nascimento' }
    ];

    ngOnInit() {
        this.requestService.getFuncionarios().subscribe((data: Funcionario[]) => {
            this.funcionarios = data;
            console.log(data);
        });
    }

    onCreate() {
        
    }

    onExcluir() {
        console.log(this.funcionariosSelecionados);
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete the selected products?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.funcionariosSelecionados = null;
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
