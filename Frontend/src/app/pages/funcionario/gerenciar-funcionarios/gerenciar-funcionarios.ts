import { Component, inject, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { FuncionarioService } from '../services/funcionario.service';
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
    dataNascimento: string;
    password?: string;
}

@Component({
    selector: 'gerenciar-funcionarios',
    standalone: true,
    imports: [
    TableModule,
    ToolbarModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    ReactiveFormsModule,
    MessageModule,
    ConfirmDialogModule,
    DatePipe
    ],
    templateUrl: './gerenciar-funcionarios.html',
})
export class GerenciarFuncionarios implements OnInit {
    funcionarios!: Funcionario[];
    funcionario!: Funcionario;
    funcionarioService = inject(FuncionarioService);
    messageService = inject(MessageService);
    confirmationService = inject(ConfirmationService);

    newFuncionarioVisible: boolean = false;
    editarFuncionarioVisible: boolean = false;

    private fb = inject(FormBuilder);

    newFuncionarioForm = this.fb.group({
        nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
        email: ['', [Validators.required, Validators.email]],
        senha: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(100)]],
        dataNascimento: ['', [Validators.required]],
    });

    editarFuncionarioForm = this.fb.group({
        nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
        email: ['', [Validators.required, Validators.email]],
        senha: ['', [Validators.minLength(6), Validators.maxLength(100)]],
        dataNascimento: ['', [Validators.required]],
    });

    funcionariosSelecionados!: Funcionario[] | null;

    cols = [
        { field: 'id', header: 'ID' },
        { field: 'nome', header: 'Nome' },
        { field: 'email', header: 'E-mail' },
        { field: 'dataNascimento', header: 'Data de Nascimento' }
    ];

    ngOnInit() {
        this.funcionarioService.getFuncionarios().subscribe((data: Funcionario[]) => {
            this.funcionarios = data;
            console.log(data);
        });
    }

    criarFuncionario() {
        this.newFuncionarioForm.markAllAsTouched();
        if (this.newFuncionarioForm.invalid) return;

        this.newFuncionarioVisible = false; 
        this.newFuncionarioForm.reset()
    }

    editarFuncionario() {
        this.editarFuncionarioForm.markAllAsTouched();
        if (this.editarFuncionarioForm.invalid) return;

        this.editarFuncionarioVisible = false;
        this.editarFuncionarioForm.reset();
    }

    onExcluir() {
        console.log(this.funcionariosSelecionados);
        this.confirmationService.confirm({
            closable: true,
            closeOnEscape: true,
            message: 'Você tem certeza que deseja excluir o(s) funcionário(s) selecionado(s)?',
            header: 'Confirmação',
            icon: 'pi pi-exclamation-triangle',
            rejectButtonProps: {
                label: 'Cancelar',
                severity: 'secondary',
                outlined: true,
            },
            acceptButtonProps: {
                label: 'Excluir',
                severity: 'danger'
            },
            accept: () => {
                this.funcionariosSelecionados = null;
                this.messageService.add({
                    severity: 'info',
                    summary: 'Funcionários Excluídos',
                    detail: 'Os funcionários selecionados foram excluídos.',
                    life: 5000
                });
            }
        });
    }

    onEditar() {
        this.editarFuncionarioVisible = true;
        this.editarFuncionarioForm.patchValue({
            nome: this.funcionariosSelecionados![0].nome,
            email: this.funcionariosSelecionados![0].email,
            dataNascimento: this.funcionariosSelecionados![0].dataNascimento,
        });
    }
}
