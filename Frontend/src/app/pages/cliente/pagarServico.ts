import { Component, inject, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RouterModule, Router, ActivatedRoute, Data } from '@angular/router';
import { RequestService } from '@/core/services/request.service';
import { CommonModule, DatePipe, Location } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { MessageService } from 'primeng/api';
import { Request, Orcamento } from '@/core/models/request.model';

@Component({
    selector: 'pagar-servico',
    standalone: true,
    imports: [
    ButtonModule,
    RouterModule,
    DatePipe,
    DialogModule,
    CommonModule
    ],
    template: ` 
    <p-dialog header="Pagamento Aprovado" [modal]="true" [(visible)]="pagaDialogVisible" [closable]="false">
        <div class="text-xl mb-4">Pagamento registrado no valor de {{orcamento.valor | currency: 'BRL'}}.</div>
        <p-button class="flex justify-end" label="OK" (onClick)="router.navigate(['/cliente/solicitacoes'])" />
    </p-dialog>
    <div class="flex flex-col h-full items-center justify-center">
        <div class="card w-full md:w-250 visualizar-solicitacao-card">
            <div class="flex align-items-center justify-content-between mb-4">
                <p-button label="Voltar" (onClick)="voltar()" icon="pi pi-arrow-left" variant="text" severity="secondary"></p-button>
            </div>
            <div class="font-semibold text-xl mb-6">Realizar Pagamento</div>
            <div class="font-bold block text-5xl mb-4">{{ request.descEquipamento }}</div>
            <div class="block font-light text-xl mb-8">Solicitado em {{request.dataInicio | date:'dd/MM/yyyy'}} às {{request.dataInicio | date:'HH:mm:ss'}}   |   ID: {{ requestId }}</div>
            <div class="mb-12">
                <div class="text-xl font-semibold mb-2">Categoria</div>
                <div class="text-xl block">{{ request.categoriaEquipamento.nome }}</div>
            </div>
            <div class="mb-12">
                <div class="text-xl font-semibold mb-4">Descrição do Problema</div>
                <div class="block text-xl rounded-border border border-surface p-4">{{ request.descDefeito }}</div>
            </div>
            <div class="mb-12">
                <div class="text-xl font-semibold mb-2">Descrição da Manutenção</div>
                <div class="text-xl rounded-border border border-surface p-4 block">{{ request.descManutencao }}</div>
            </div>
                        <div class="mb-12">
                <div class="text-xl font-semibold mb-2">Orientações ao cliente</div>
                <div class="text-xl rounded-border border border-surface p-4 block">{{ request.observacao }}</div>
            </div>
            <div class="mb-12">
                <div class="text-2xl font-bold mb-4 flex justify-center">Valor Devido</div>
                <div class="block text-2xl flex justify-center rounded-border border border-surface p-4 p-tag-finalizada">{{ orcamento.valor | currency:'BRL':'symbol':'1.2-2':'pt' }}</div>
            </div>

            <p-button size="large" label="Pagar Serviço" (click)="onPagar()" fluid="true" icon="pi pi-dollar"/>
        </div>
    </div>`
})

export class PagarServico implements OnInit {
    requestId?: number;
    request!: Request;
    orcamento!: Orcamento;

    pagaDialogVisible: boolean = false;
    route = inject(ActivatedRoute);
    router = inject(Router);
    location = inject(Location);
    requestService = inject(RequestService);
    messageService = inject(MessageService);

    ngOnInit(): void {
        this.requestId = parseInt(this.route.snapshot.paramMap.get('id') || '-1');
        if (isNaN(this.requestId) || this.requestId < 1) {
            this.router.navigate(['/notfound']);
            return;
        }

        this.requestService.getRequestById(this.requestId).subscribe((data: Request) => {
        this.request = data;
        if (!this.request) {
            this.router.navigate(['/notfound']);
            return;
        }
        });

        this.requestService.getOrcamento(this.requestId).subscribe((data: Orcamento) => {
        this.orcamento = data;
        if (!this.orcamento) {
            this.router.navigate(['/notfound']);
            return;
        }
        });
    }

    voltar() {
        if (history.state.fromList) {
            this.location.back();
        } else {
            this.router.navigate(['/cliente/solicitacoes']);
        }
    }

    onPagar()  {
        this.requestService.pagar(this.request.id!, this.request.cliente!.id, this.orcamento.valor).subscribe({
            next: () => {
                this.pagaDialogVisible = true;
                this.messageService.add({
                        severity: 'success',
                        summary: 'Serviço Pago',
                        detail: 'O pagamento do serviço foi realizado com sucesso.',
                        life: 5000
                    });
                this.router.navigate(['/cliente/solicitacoes'])
            },

            error: () => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erro ao Pagar Serviço',
                    detail: 'Ocorreu um erro ao processar o pagamento. Por favor, tente novamente mais tarde.',
                    life: 5000
                });
            }
        });
    }

}