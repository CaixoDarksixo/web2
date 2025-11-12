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
  templateUrl: "./pagar-servico.html"
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
        this.requestService.pagar(this.request.id!, this.request.clienteId, this.orcamento.valor).subscribe({
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
