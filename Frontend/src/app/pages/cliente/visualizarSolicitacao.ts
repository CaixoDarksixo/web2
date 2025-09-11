import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { RouterModule, Router } from '@angular/router';
import { RequestService } from '../service/request.service';
import { DatePipe } from '@angular/common';
import { Location } from '@angular/common';

interface Request {
    id?: number;
    dataHora?: string;
    descricaoEquipamento?: string;
    categoria?: string;
    descricaoProblema?: string;
    status?: string;
}

@Component({
    selector: 'visualizar-solicitacao',
    standalone: true,
    imports: [
    ButtonModule,
    RouterModule,
    DatePipe
    ],
    template: ` 
    <div class="card">
        <div class="flex align-items-center justify-content-between mb-4">
            <p-button label="Voltar para Solicitações" (onClick)="voltar()" icon="pi pi-arrow-left" styleClass="p-button-text p-button-plain"></p-button>
        </div>
        <div class="font-semibold text-xl mb-10">Detalhes da Solicitação</div>
        <div class="mb-4">
            <div class="text-xl mb-4">Descrição do Equipamento</div>
            <div class="font-semibold block text-5xl mb-4">{{ request.descricaoEquipamento }}</div>
        </div>
        <div class="flex justify-between items-center mb-4">
            <div>
                <div class="text-xl mb-4">ID</div>
                <div class="block text-xl mb-4">{{ requestId }}</div>
            </div>
            <div>
                <div class="text-xl mb-4">Status</div>
                <div class="block mb-4">{{ request.status }}</div>
            </div>
        </div>
        <div class="mb-4">
            <div class="text-xl mb-4">Descrição do Problema</div>
            <div class="block mb-4">{{ request.descricaoProblema }}</div>
        </div>
        <div class="mb-4">
            <div class="text-xl mb-4">Data e Hora da Solicitação</div>
            <div class="block mb-4">{{ request.dataHora | date:'dd/MM/yyyy HH:mm:ss' }}</div>
        </div>
        <div class="mb-4">
            <div class="text-xl mb-4">Categoria</div>
            <div class="block mb-4 ">{{ request.categoria }}</div>
        </div>
    </div>`
})
export class VisualizarSolicitacao implements OnInit {
    requestId?: number;
    request!: Request;

    route = inject(ActivatedRoute);
    location = inject(Location);
    router = inject(Router);
    requestService = inject(RequestService);

    ngOnInit(): void {
    this.requestId = parseInt(this.route.snapshot.paramMap.get('id') || '-1');
    if (isNaN(this.requestId) || this.requestId < 1) {
        this.router.navigate(['/notfound']);
        return;
    }
    this.requestService.getRequestById(this.requestId).subscribe((data: Request) => {
            this.request = data;
            console.log(this.request);
            if (!this.request) {
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

}