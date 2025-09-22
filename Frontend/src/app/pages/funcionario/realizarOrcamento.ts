import { Component, inject, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RouterModule, Router, ActivatedRoute} from '@angular/router';
import { CommonModule, DatePipe, Location } from '@angular/common';
import { RequestService } from '../service/request.service';
import { FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import { MessageModule } from 'primeng/message';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { AuthService } from '../service/auth.service';

interface Request {
    id: number;
    clienteId: number;
    status: string;
    categoria: string;
    funcionarioAtualId?: number;
    dataHoraAbertura: string;
    descricaoEquipamento: string;
    descricaoProblema: string;
    descricaoManutencao?: string;
    orientacoesCliente?: string;
    dataHoraFechamento?: string;
}

interface Cliente {
  id: number;
  nome: string;
  email: string;
  telefone?: string;
  endereco?: string;
}

interface Orcamento {
  id: number;
  solicitacaoId: number;
  funcionario: string;
  valor: number;
  dataHora: string;
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
    template: ` 
    <div class="card">
        <div class="flex align-items-center justify-content-between mb-4">
            <p-button label="Voltar" (onClick)="voltar()" icon="pi pi-arrow-left" variant="text" severity="secondary"></p-button>
        </div>
                    <div class="font-semibold text-xl mb-6">Realizar Orçamento</div>
        <div class="font-bold block text-5xl mb-4">{{ request.descricaoEquipamento }}</div>
        <div class="block font-light text-xl mb-8">Solicitado em {{request.dataHoraAbertura | date:'dd/MM/yyyy'}} às {{request.dataHoraAbertura | date:'HH:mm:ss'}}   |   ID: {{ requestId }}</div>
        <div class="mb-12">
            <div class="text-xl font-semibold mb-2">Categoria</div>
            <div class="text-xl block">{{ request.categoria }}</div>
        </div>
        <div class="mb-12">
            <div class="text-xl font-semibold mb-4">Descrição do Problema</div>
            <div class="block text-xl rounded-border border border-surface p-4">{{ request.descricaoProblema }}</div>
        </div>
        <div class="mb-12">
            <div class="text-xl font-semibold mb-4">Cliente</div>
            <div class="block text-xl rounded-border border border-surface p-4">
                <div class="mb-2">Nome: {{ cliente.nome }}</div>
                <div class="mb-2">Email: {{ cliente.email }}</div>
                <div class="mb-2">Telefone: {{ cliente.telefone }}</div>
                <div class="mb-2">Endereço: {{ cliente.endereco }}</div>
            </div>
        </div>
        <form [formGroup]="orcamentoForm" class="w-full">
            <label for="valorOrcamento" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2 mt-4 after:ml-0.5 after:text-red-600 after:content-['*']" >Valor do Orçamento</label>
            <p-inputnumber mode="currency" fluid="true" currency="BRL" locale="pt-BR" placeholder="Insira o valor" class="w-full md:w-120 mb-2" formControlName="valor"/>
            @if (orcamentoForm.controls.valor.touched && orcamentoForm.controls.valor.invalid) {
                <p-message severity="error" size="small" variant="simple">Insira um valor válido.</p-message>
                }
            <div class="flex justify-end mt-4">
                <p-button label="Enviar Orçamento" (click)="onEnviar()"/>
            </div>
        </form>   
    </div>`
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
    authService = inject(AuthService);

    orcamentoForm = this.fb.group({
        valor: [null, [Validators.required]],
    });

    ngOnInit(): void {
        this.authService.getAuthenticatedUser().subscribe(user => {
            this.currentUser = user;
            console.log(this.currentUser.nome)
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

            this.requestService.getUserById(this.request.clienteId).subscribe((data: Cliente) => {
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

        this.requestService.criarOrcamento(this.request.id, {funcionario: this.currentUser.nome, valor: this.orcamentoForm.value.valor!}).subscribe((updatedRequest: Request) => {
            this.router.navigate(['/funcionario/solicitacoes'])
        });
    }
}
