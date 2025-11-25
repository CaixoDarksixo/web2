import { Component, inject, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RouterModule, Router, ActivatedRoute, Data } from '@angular/router';
import { RequestService } from '@/core/services/request.service';
import { CommonModule, DatePipe, Location } from '@angular/common';
import { TagModule } from 'primeng/tag'; 
import { TimelineModule } from 'primeng/timeline';
import { SkeletonModule } from 'primeng/skeleton';
import { Card } from 'primeng/card';
import { Request } from '@/core/models/request.model';

interface History {
    id: number;
    solicitacaoId: number;
    statusAnterior: string;
    statusAtual: string;
    funcionarioDestino?: string;
    autor: string;       
    dataHora: string;    
    observacao?: string;
    descRejeicao?: string;
}

@Component({
    selector: 'visualizar-solicitacao',
    standalone: true,
    imports: [
    ButtonModule,
    RouterModule,
    DatePipe,
    TagModule,
    TimelineModule,
    Card,
    CommonModule,
    SkeletonModule
    ],
    templateUrl: './visualizar-solicitacao.html',
})

export class VisualizarSolicitacao implements OnInit {
    requestId?: number;
    request!: Request;
    events?: History[];

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
                if (!this.request) {
                    this.router.navigate(['/notfound']);
                    return;
                }
            });

        this.requestService.getHistory(this.requestId).subscribe((data: History[]) => {
            this.events = data;
            console.log(data);
        })
    }

    voltar() {
        if (history.state.fromList) {
            this.location.back();
        } else {
            this.router.navigate(['/cliente/solicitacoes']);
        }
    }

    onRescue() {
        this.requestService.rescueRequest(this.request.id!).subscribe((updatedRequest: Request) => {
            this.request = updatedRequest;
            this.requestService.getHistory(this.request.id!).subscribe((data: History[]) => {
                this.events = data;
            })
        });
    }

    getHistoryDesc(history: History, request: Request): string {
        switch (history.statusAtual) {
            case "ABERTA": 
                return(`Solicitação aberta. Aguardando orçamento do funcionário responsável.`);
            case "ORCADA": 
                return(`Orçamento aguardando aprovação do cliente.`);
            case "APROVADA": 
                return(`Orçamento aprovado. Aguardando manutenção.`);
            case "REJEITADA": 
                return(`Serviço rejeitado pelo cliente. Motivo: ${history.descRejeicao}`);
            case "ARRUMADA": 
                return(`Equipamento reparado: ${request.descManutencao} Orientações: ${request.observacao}`);
            case "REDIRECIONADA": 
                return(`Solicitação redirecionada de ${history.autor} para ${history.funcionarioDestino}.`);
            case "PAGA": 
                return(`Serviço pago pelo cliente.`);
            case "FINALIZADA": 
                return(`Solicitação finalizada pelo funcionário ${history.autor}.`);
            default:
                return("Desconhecido.");
        }
    }
}