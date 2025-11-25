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
import { Request } from '@/core/models/request.model';
import { CommonModule } from '@angular/common';
import { DatePickerModule } from 'primeng/datepicker';

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
    ConfirmDialogModule,
    DatePickerModule,
    CommonModule
    ],

    templateUrl: './solicitacoes.html'
})
export class Solicitacoes implements OnInit {
    allRequests: Request[] = []; 
    requests!: Request[];

    showDatePicker: boolean = false;
    rangeDates: Date[] | undefined;
    newRequestVisible: boolean = false;
    currentUser: any;
    cols = [
            { field: 'id', header: 'ID' },
            { field: 'dataInicio', header: 'Data/Hora de Abertura' },
            { field: 'descEquipamento', header: 'Descrição do Equipamento' },
            { field: 'cliente', header: 'Cliente' },
            { field: 'status', header: 'Status' },
            { field: 'Ações', header: 'Ações' }
        ];

    filtros = [
        { label: 'Todas', value: 'todas' },
        { label: 'Hoje', value: 'hoje' },
        { label: 'Selecionar período', value: 'periodo' }
    ];

    loading: boolean = true;

    messageService = inject(MessageService);
    confirmationService = inject(ConfirmationService);
    requestService = inject(RequestService);
    router = inject(Router);
    authService = inject(AuthService);

    ngOnInit() {
        this.authService.getAuthenticatedUser().subscribe(user => {
            this.currentUser = user;
            this.requestService.getRequests({funcionarioId: this.currentUser.id}).subscribe({
                next: (data: Request[]) => {
                    this.allRequests = data;
                    this.requests = [...this.allRequests];
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
                this.requestService.finalizar(requestId, this.currentUser.id).subscribe({
                    next: (updatedRequest) => {
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
                    },
                    error: (err) => {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Erro',
                            detail: 'Ocorreu um erro ao finalizar a solicitação.',
                            life: 5000
                        });
                    }
                });
            }
        });
    }

    onFiltroChange(event: any) {
        const filtro = event.value;

        if (filtro !== 'periodo') {
            this.showDatePicker = false;
            this.rangeDates = undefined;
        }

        switch (filtro) {
            case 'todas':
                this.requests = [...this.allRequests];
                break;

            case 'hoje':
                this.requests = this.requests.filter(req =>
                new Date(req.dataInicio!).toDateString() === new Date().toDateString());
                const hoje = new Date();
                break;

            case 'periodo':
                this.showDatePicker = true;
                break;
        }
    }

    onDateRangeSelect() {
        if (this.rangeDates && this.rangeDates[1]) {
            const inicio = this.rangeDates[0];
            const fim = this.rangeDates[1];
            
            inicio.setHours(0, 0, 0, 0);
            fim.setHours(23, 59, 59, 999);

            console.log('Filtrando de', inicio, 'até', fim);

            this.requests = this.allRequests.filter(req => {
                const dataString = req.dataInicio ?? '';
                const dataReq = new Date(dataString);
                return dataReq >= inicio && dataReq <= fim;
            });
        }
    }
}
