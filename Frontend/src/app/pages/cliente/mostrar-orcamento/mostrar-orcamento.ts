import { Component, inject, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RouterModule, Router, ActivatedRoute} from '@angular/router';
import { RequestService } from '@/core/services/request.service';
import { Request } from '@/core/models/request.model';
import { Orcamento } from '@/core/models/orcamento.model';
import { CommonModule, DatePipe, Location } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { TextareaModule } from 'primeng/textarea';
import { FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import { MessageModule } from 'primeng/message';
import { MessageService } from 'primeng/api';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
    selector: 'mostrar-orcamento',
    standalone: true,
    imports: [
    ButtonModule,
    RouterModule,
    DatePipe,
    MessageModule,
    ReactiveFormsModule,
    DialogModule,
    TextareaModule,
    CommonModule,
    SkeletonModule
    ],
    templateUrl: './mostrar-orcamento.html',
})

export class MostrarOrcamento implements OnInit {
    requestId?: number;
    request!: Request;
    orcamento!: Orcamento;

    aprovadaDialogVisible: boolean = false;
    rejeitadaDialogVisible: boolean = false;

    route = inject(ActivatedRoute);
    router = inject(Router);
    location = inject(Location);
    requestService = inject(RequestService);
    messageService = inject(MessageService);
    private fb = inject(FormBuilder);

    rejeitarForm = this.fb.group({
        motivoRejeicao: ['', [Validators.required]],
    });

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
            console.log(this.orcamento);
        });
    }

    voltar() {
        if (history.state.fromList) {
            this.location.back();
        } else {
            this.router.navigate(['/cliente/solicitacoes']);
        }
    }

    onAprovar()  {
        this.requestService.aprovarOrcamento(this.request.id!).subscribe(
            () => {
            this.aprovadaDialogVisible = true;
            }
        );
    }

    onRejeitar() {
          if (this.rejeitarForm.invalid) {
            this.rejeitarForm.markAllAsTouched();
            return;
        }

        this.requestService.rejeitarOrcamento(
            this.request.id!,
            this.rejeitarForm.value.motivoRejeicao!
        ).subscribe({
            next: () => {
                this.messageService.add({
                    severity: 'info',
                    summary: 'Orçamento Rejeitado',
                    detail: 'Você rejeitou o orçamento com sucesso.',
                    life: 5000
                });
                this.router.navigate(['/cliente/solicitacoes']);
            },

            error: () => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erro',
                    detail: 'Não foi possível rejeitar o orçamento. Tente novamente.',
                    life: 5000
                });
            }
        });
    }
}