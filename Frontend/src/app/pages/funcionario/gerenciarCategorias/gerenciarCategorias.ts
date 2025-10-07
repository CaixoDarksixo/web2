import { Component, inject, OnInit } from '@angular/core';
import { Table, TableModule } from 'primeng/table';
import { RequestService } from '../../service/request.service';
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
    MessageModule,
    ConfirmDialogModule
    ],
    templateUrl: './gerenciarCategorias.html'
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
            closable: true,
            closeOnEscape: true,
            message: 'Você tem certeza que deseja excluir a(s) categoria(s) selecionadas?',
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
                this.categoriasSelecionadas = null;
                this.messageService.add({
                    severity: 'info',
                    summary: 'Categorias Excluídas',
                    detail: 'As categorias selecionadas foram excluídas.',
                    life: 5000
                });
            }
        });
    }
}
