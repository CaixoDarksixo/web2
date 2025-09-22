import { Component, inject, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RouterModule, Router, ActivatedRoute} from '@angular/router';
import { CommonModule, DatePipe, Location } from '@angular/common';
import { RequestService } from '../service/request.service';
import { DialogModule } from 'primeng/dialog';
import { TextareaModule } from 'primeng/textarea';
import { FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import { MessageModule } from 'primeng/message';
import { SelectModule } from 'primeng/select';
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

interface Funcionario {
  id: number;
  nome: string;
  email: string;
}

@Component({
    selector: 'efetuar-manutencao',
    standalone: true,
    imports: [
    ButtonModule, 
    RouterModule,
    DatePipe,
    CommonModule,
    MessageModule,
    ReactiveFormsModule,
    DialogModule,
    TextareaModule,
    SelectModule
    ],
    template: ` 
    <p-dialog header="Redirecionar Manutenção" [modal]="true" [(visible)]="redirecionarDialogVisible" [style]="{ width: '50rem'}" [closable]="true">
        <form [formGroup]="redirecionarForm" class="w-full">
            <div [style]="{ height: '20rem'}">
                <label for="funcionarioDestino" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2 mt-4 after:ml-0.5 after:text-red-600 after:content-['*']" >Funcionário Destino</label>
                <p-select class="w-full md:w-120 mb-2" fluid="true" formControlName="funcionarioDestino" [options]="funcionarios" optionLabel="nome" optionValue="id"></p-select>
                @if (redirecionarForm.controls.funcionarioDestino.touched && redirecionarForm.controls.funcionarioDestino.invalid) {
                    <p-message severity="error" size="small" variant="simple">Selecione o funcionário</p-message>
                }
                <div class="flex justify-end gap-2">
                    <p-button label="Cancelar" severity="secondary" (click)="redirecionarDialogVisible = false; this.redirecionarForm.reset()" />
                    <p-button label="Redirecionar" (click)="onRedirecionar()"/>
                </div>
            </div>
        </form>
    </p-dialog>

    <p-dialog header="Realizar Manutenção" [modal]="true" [(visible)]="efetuarManutencaoDialogVisible" [style]="{ width: '50rem'}" [closable]="true">
        <form [formGroup]="manutencaoForm" class="w-full">
            <label for="descricaoManutencao" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2 mt-4 after:ml-0.5 after:text-red-600 after:content-['*']" >Descrição da Manutenção</label>
            <textarea rows="3" pTextarea class="w-full md:w-120 mb-2" fluid=true [autoResize]="true" formControlName="descricaoManutencao"></textarea>
            @if (manutencaoForm.controls.descricaoManutencao.touched && manutencaoForm.controls.descricaoManutencao.invalid) {
                <p-message severity="error" size="small" variant="simple">Insira a descrição</p-message>
            }
            <label for="instrucoesCliente" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2 mt-4 after:ml-0.5 after:text-red-600 after:content-['*']" >Instruções para o Cliente</label>
            <textarea rows="3" pTextarea class="w-full md:w-120 mb-2" fluid=true [autoResize]="true" formControlName="instrucoesCliente"></textarea>
            @if (manutencaoForm.controls.instrucoesCliente.touched && manutencaoForm.controls.instrucoesCliente.invalid) {
                <p-message severity="error" size="small" variant="simple">Insira a instrução</p-message>
            }
            <div class="flex justify-end gap-2">
                <p-button label="Cancelar" severity="secondary" (click)="efetuarManutencaoDialogVisible = false; this.manutencaoForm.reset()" />
                <p-button label="Efetuar Manutenção" (click)="onEfetuar()"/>
            </div>
        </form>
    </p-dialog>

    <div class="card">
        <div class="flex align-items-center justify-content-between mb-4">
            <p-button label="Voltar" (onClick)="voltar()" icon="pi pi-arrow-left" variant="text" severity="secondary"></p-button>
        </div>
        <div class="font-semibold text-xl mb-6">Efetuar Manutenção</div>
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
        <div class="flex justify-end gap-5">
            <p-button size="large" label="Redirecionar Manutenção" severity="secondary" (click)="redirecionarDialogVisible = true"/>
            <p-button size="large" label="Efetuar Manutenção" (click)="efetuarManutencaoDialogVisible = true"/>
        </div>
    </div>`
})
export class EfetuarManutencao implements OnInit {
    requestId?: number;
    request!: Request;
    cliente!: Cliente;
    funcionarios!: Funcionario[];
    currentUser: any;

    redirecionarDialogVisible: boolean = false;
    efetuarManutencaoDialogVisible: boolean = false;

    requestService = inject(RequestService);
    route = inject(ActivatedRoute);
    router = inject(Router);
    location = inject(Location);
    private fb = inject(FormBuilder);
    authService = inject(AuthService);

    redirecionarForm = this.fb.group({
        funcionarioDestino: [null, [Validators.required]],
    });

    manutencaoForm = this.fb.group({
         descricaoManutencao: ['', [Validators.required]],
        instrucoesCliente: ['', [Validators.required]],
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
                
            this.requestService.getUserById(this.request.clienteId).subscribe((data: Cliente) => {
                this.cliente = data;
            });
        });

        this.requestService.getFuncionarios().subscribe((data: Funcionario[]) => {
            data = data.filter(f => f.id !== this.currentUser.id);
            this.funcionarios = data;
            console.log(this.funcionarios);
        });

    }

    voltar() {
        if (history.state.fromList) {
            this.location.back();
        } else {
            this.router.navigate(['/funcionario/solicitacoes']);
        }
    }

    onEfetuar() {
        if (this.manutencaoForm.invalid) {
            this.manutencaoForm.markAllAsTouched();
            return;
        }

        this.requestService.manutencao(this.request.id, {funcionarioId: this.request.funcionarioAtualId!, observacao:""}).subscribe((updatedRequest: Request) => {
            this.router.navigate(['/funcionario/solicitacoes'])
        });
    }

    onRedirecionar()  {
        if (this.redirecionarForm.invalid) {
            this.redirecionarForm.markAllAsTouched();
            return;
        }

        this.requestService.redirecionarSolicitacao(this.request.id, {
            fromFuncionarioId: this.request.funcionarioAtualId!,
            toFuncionarioId: this.redirecionarForm.value.funcionarioDestino!
        }).subscribe((updatedRequest: Request) => {
            this.router.navigate(['/funcionario/solicitacoes'])
        });
    }
}
