import { Component, inject, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RouterModule, Router, ActivatedRoute} from '@angular/router';
import { CommonModule, DatePipe, Location } from '@angular/common';
import { RequestService } from '@/core/services/request.service';
import { FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import { MessageModule } from 'primeng/message';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { AuthService } from '@/core/services/auth.service';
import { UserService } from '@/core/services/user.service';
import { Request } from '@/core/models/request.model';
import { MessageService } from 'primeng/api';

interface Cliente {
  id: number;
  nome: string;
  email: string;
  telefone?: string;
  endereco?: string;
}

@Component({
    selector: 'realizar-orcamento',
    standalone: true,
    imports: [
    ButtonModule, 
    RouterModule,
    DatePipe,
    CommonModule,
    MessageModule,
    ReactiveFormsModule,
    InputTextModule,
    InputNumberModule
    ],
    templateUrl: './realizar-orcamento.html',
})

export class RealizarOrcamento implements OnInit {
    requestId?: number;
    request!: Request;
    cliente!: Cliente;
    currentUser: any;

    requestService = inject(RequestService);
    route = inject(ActivatedRoute);
    router = inject(Router);
    location = inject(Location);
    private fb = inject(FormBuilder);
    private authService = inject(AuthService);
    private userService = inject(UserService);
    messageService = inject(MessageService);

    orcamentoForm = this.fb.group({
        valor: [null, [Validators.required]],
    });

    ngOnInit(): void {
        this.authService.getAuthenticatedUser().subscribe(user => {
            this.currentUser = user;
        });

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
            
            this.userService.getClienteById(this.request.cliente!.id).subscribe((data: Cliente) => {
                this.cliente = data;
            });
        });
    }

    voltar() {
        if (history.state.fromList) {
            this.location.back();
        } else {
            this.router.navigate(['/funcionario/solicitacoes']);
        }
    }

    onEnviar() {
        if (this.orcamentoForm.invalid) {
            this.orcamentoForm.markAllAsTouched();
            return;
        }

        this.requestService.criarOrcamento(
            this.request.id!, 
            this.orcamentoForm.value.valor!
        ).subscribe({
            next: () => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Orçamento Enviado',
                    detail: 'O orçamento foi enviado com sucesso.',
                    life: 5000
                });

                this.router.navigate(['/funcionario/solicitacoes'])
            },
            error: () => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erro ao Enviar Orçamento',
                    detail: 'Ocorreu um erro ao enviar o orçamento. Tente novamente mais tarde.',
                    life: 5000
                });
            }
        });
    }
}
