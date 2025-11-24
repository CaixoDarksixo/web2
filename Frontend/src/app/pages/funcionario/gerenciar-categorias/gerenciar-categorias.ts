import { Component, inject, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CategoriaService } from '@/core/services/categoria.service';
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
    ativo: boolean;
}

@Component({
    selector: 'gerenciar-categorias',
    standalone: true,
    imports: [
    TableModule,
    ToolbarModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    ReactiveFormsModule,
    MessageModule,
    ConfirmDialogModule
    ],
    templateUrl: './gerenciar-categorias.html'
})
export class GerenciarCategorias implements OnInit {
    categorias!: Categoria[];
    categoriaEditar!: Categoria;
    categoriaService = inject(CategoriaService);
    messageService = inject(MessageService);
    confirmationService = inject(ConfirmationService);

    newCategoriaVisible: boolean = false;
    editarCategoriaVisible: boolean = false;

    categoriasSelecionadas!: Categoria[] | null;

    private fb = inject(FormBuilder);

    categoriaForm = this.fb.group({
        nome: ['', [Validators.required, Validators.maxLength(100)]]
    });

    cols = [
        { field: 'id', header: 'ID' },
        { field: 'nome', header: 'Nome' }
    ];

    ngOnInit() {
        this.categoriaService.getCategorias().subscribe((data: Categoria[]) => {
            this.categorias = data;
        });
    }

    criarCategoria() {
        this.newCategoriaVisible = false; 
        this.categoriaForm.reset()
    }

    editarCategoria() {
        this.editarCategoriaVisible = false;
        this.categoriaForm.reset();
    }

    onExcluir() {
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

    onEditar() {
        this.editarCategoriaVisible = true;
        this.categoriaForm.patchValue({
            nome: this.categoriasSelecionadas![0].nome
        });
    }
}
