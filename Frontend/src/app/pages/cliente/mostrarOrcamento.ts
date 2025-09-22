import { Component, inject, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RouterModule, Router, ActivatedRoute} from '@angular/router';
import { RequestService } from '../service/request.service';
import { CommonModule, DatePipe, Location } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { TextareaModule } from 'primeng/textarea';
import { FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import { MessageModule } from 'primeng/message';

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

interface Orcamento {
  id: number;
  solicitacaoId: number;
  funcionario: string;
  valor: number;
  dataHora: string;
}


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
    CommonModule
    ],
    template: ` 
    <p-dialog header="Orçamento Aprovado" [modal]="true" [(visible)]="aprovadaDialogVisible" [closable]="false">
        <div class="text-xl mb-4">Serviço Aprovado no Valor de {{orcamento.valor | currency: 'BRL'}}.</div>
        <p-button class="flex justify-end" label="OK" (onClick)="router.navigate(['/cliente/solicitacoes'])" />
    </p-dialog>

    <p-dialog header="Rejeitar serviço" [modal]="true" [(visible)]="rejeitadaDialogVisible" [style]="{ width: '50rem'}" [closable]="true">
        <form [formGroup]="rejeitarForm" class="w-full">
            <label for="motivoRejeicao" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2 mt-4 after:ml-0.5 after:text-red-600 after:content-['*']" >Motivo da rejeição</label>
            <textarea rows="3" pTextarea class="w-full md:w-120 mb-2" fluid=true [autoResize]="true" formControlName="motivoRejeicao"></textarea>
            @if (rejeitarForm.controls.motivoRejeicao.touched && rejeitarForm.controls.motivoRejeicao.invalid) {
                <p-message severity="error" size="small" variant="simple">Insira um motivo</p-message>
            }
            <div class="flex justify-end gap-2">
                <p-button label="Cancelar" severity="secondary" (click)="rejeitadaDialogVisible = false; this.rejeitarForm.reset()" />
                <p-button label="Rejeitar" (click)="onRejeitar()"/>
            </div>
        </form>
    </p-dialog>

    <div class="flex flex-col h-full items-center justify-center">
        <div class="card w-full md:w-250 visualizar-solicitacao-card">
            <div class="flex align-items-center justify-content-between mb-4">
                <p-button label="Voltar" (onClick)="voltar()" icon="pi pi-arrow-left" variant="text" severity="secondary"></p-button>
            </div>
                        <div class="font-semibold text-xl mb-6">Visualizar Orçamento</div>
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
            <div class="mb-4">
                <div class="text-2xl font-bold mb-4 flex justify-center">Valor Orçado</div>
                <div class="block text-2xl flex justify-center rounded-border border border-surface p-4 p-tag-finalizada">{{ orcamento.valor | currency: 'BRL' }}</div>
            </div>
            <div class="block font-light text-xl mb-12">Orçado em {{orcamento.dataHora | date:'dd/MM/yyyy'}} às {{orcamento.dataHora | date:'HH:mm:ss'}} por {{orcamento.funcionario}}</div>
            <div class="flex justify-end gap-5">
                <p-button size="large" label="Rejeitar Serviço" severity="secondary" (click)="rejeitadaDialogVisible = true"/>
                <p-button size="large" label="Aprovar Serviço" (click)="onAprovar()"/>
            </div>
        </div>
    </div>`
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
        this.requestService.aprovarOrcamento(this.request.id, {clienteId: this.request.clienteId}).subscribe();
        this.aprovadaDialogVisible = true;
    }

    onRejeitar() {
        this.requestService.rejeitarOrcamento(this.request.id, {motivo: this.rejeitarForm.value.motivoRejeicao!, clienteId: this.request.clienteId}).subscribe();
        this.router.navigate(['/cliente/solicitacoes'])
    }
}