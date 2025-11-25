import { CategoriaService } from '@/core/services/categoria.service';
import { Component, inject, OnInit } from '@angular/core';
import { Table, TableModule } from 'primeng/table';
import { IconFieldModule } from 'primeng/iconfield';
import { RequestService } from '@/core/services/request.service';
import { AuthService } from '@/core/services/auth.service';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { MessageModule } from 'primeng/message';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { DatePipe } from '@angular/common';
import { TruncatePipe } from '@/shared/pipes/truncate-pipe';
import { RouterModule, Router } from '@angular/router';
import { InputIconModule } from 'primeng/inputicon';
import { FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { SkeletonModule } from 'primeng/skeleton';
import { Request } from '@/core/models/request.model';

interface Column {
    field: string;
    header: string;
}

interface Categoria {
    label: string;
    value: number;
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
    TruncatePipe,
    RouterModule,
    SkeletonModule
],
        templateUrl: './solicitacoes.html',
})

export class Solicitacoes implements OnInit {
    private fb = inject(FormBuilder);
    private messageService = inject(MessageService);
    private categoriaService = inject(CategoriaService);
    loading = true;
    requests!: Request[];
    cols!: Column[];
    newRequestVisible: boolean = false;
    currentUser: any;
    categorias!: Categoria[];
    requestService = inject(RequestService);
    router = inject(Router);
    authService = inject(AuthService);

    newRequestForm = this.fb.group({
        descricaoEquipamento: ['', [Validators.required, Validators.maxLength(50)]],
        descricaoProblema: ['', [Validators.required, Validators.maxLength(500)]],
        categoria: [null, [Validators.required]],
    });

    ngOnInit() {
        this.categoriaService.getCategorias().subscribe((data) => {
            this.categorias = data.map((cat: any) => ({
                label: cat.nome,
                value: cat.id
            }));
            console.log("Categorias:", this.categorias);
        });

        this.authService.getAuthenticatedUser().subscribe(user => {
            this.currentUser = user;
            this.requestService.getRequests({clienteId: this.currentUser.id}).subscribe({
                next: (data: Request[]) => {
                    this.requests = data;
                },
                error: () => {
                    this.loading = false;
                },
                complete: () => {
                    this.loading = false;
                    console.log('requests:', this.requests);
                }
            });
        });


        this.cols = [
            { field: 'id', header: 'ID' },
            { field: 'dataInicio', header: 'Data/Hora de Abertura' },
            { field: 'descEquipamento', header: 'Descrição do Equipamento' },
            { field: 'status', header: 'Status' },
            { field: 'Ações', header: 'Ações' }
        ];
    };
    
    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    onRescue(id: number) {
        this.requestService.rescueRequest(id).subscribe((updatedRequest) => {
            const index = this.requests.findIndex(r => r.id === updatedRequest.id);
            if (index > -1) {
                this.requests[index] = updatedRequest;
                this.requests = [...this.requests];
            }
            this.messageService.add({
                    severity: 'success',
                    summary: 'Solicitação Resgatada',
                    detail: 'A solicitação foi resgatada e está aberta novamente.',
                    life: 5000
                });
        });
    }

    onCreate() {
        this.newRequestForm.markAllAsTouched();

        if (this.newRequestForm.invalid) {
            return;
        };

        this.requestService.createRequest({
            categoriaId: this.newRequestForm.value.categoria!,
            descricaoEquipamento: this.newRequestForm.value.descricaoEquipamento!,
            descricaoProblema: this.newRequestForm.value.descricaoProblema!
        }).subscribe({
            next: (request) => {
                this.requests = [...this.requests, request];
                this.newRequestForm.reset();
                this.newRequestVisible = false;

                this.messageService.add({
                    severity: 'success',
                    summary: 'Solicitação Criada',
                    detail: 'Sua solicitação de manutenção foi criada com sucesso.',
                    life: 5000
                })
            },

            error: () => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erro ao Criar Solicitação',
                    detail: 'Não foi possível criar a solicitação. Tente novamente.',
                    life: 5000
                });
            }
        });
    }
}