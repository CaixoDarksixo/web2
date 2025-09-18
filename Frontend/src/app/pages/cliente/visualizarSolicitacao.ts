import { Component, inject, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { RequestService } from '../service/request.service';
import { DatePipe, Location } from '@angular/common';
import { TagModule } from 'primeng/tag'; 
import { TimelineModule } from 'primeng/timeline';
import { Card } from 'primeng/card';
import { Skeleton } from 'primeng/skeleton';

interface Request {
    id?: number;
    dataHoraAbertura?: string;
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
    DatePipe,
    TagModule,
    TimelineModule,
    Card,
    Skeleton
    ],
    template: ` 
    <div class="flex flex-col h-full items-center justify-center">
        <div class="card w-full md:w-250 visualizar-solicitacao-card">
            <div class="flex align-items-center justify-content-between mb-4">
                <p-button label="Voltar para Solicitações" (onClick)="voltar()" icon="pi pi-arrow-left" variant="text" severity="secondary"></p-button>
            </div>
            <div class="font-semibold text-xl mb-6">Detalhes da Solicitação</div>
            <div class="font-bold block text-5xl mb-4">{{ request.descricaoEquipamento }}</div>
            <div class="block font-light text-xl mb-8">Solicitado em {{request.dataHoraAbertura | date:'dd/MM/yyyy'}} às {{request.dataHoraAbertura | date:'HH:mm:ss'}}   |   ID: {{ requestId }}</div>
            <div class="flex justify-start items-center mb-12">
                <div class="mr-20">
                    <div class="text-xl font-semibold mb-2">Status</div>
                    <p-tag class="big-tag" [icon]="requestService.getIcon(request.status || '')" [value]="request.status" [class]="requestService.getTagClass(request.status || '')"/>
                </div>
                <div>
                    <div class="text-xl font-semibold mb-2">Categoria</div>
                    <div class="text-xl block">{{ request.categoria }}</div>
                </div>
            </div>
            <div class="mb-12">
                <div class="text-xl font-semibold mb-4">Descrição do Problema</div>
                <div class="block text-xl rounded-border border border-surface p-4">{{ request.descricaoProblema }}</div>
            </div>
            <div class="mb-16">
                @if (request.status === 'ORÇADA') {
                    <p-button label="Aprovar/Rejeitar Orçamento" size="large" fluid="true" icon="pi pi-check-square"/>
                }

                @else if (request.status === 'REJEITADA') {    
                    <p-button label="Resgatar" size="large" fluid="true" icon="pi pi-reply"/>
                }

                @else if (request.status === 'ARRUMADA') {    
                    <p-button label="Pagar" size="large" fluid="true" icon="pi pi-dollar"/>
                }
            </div>
            <div class="font-semibold text-xl mb-4">Histórico</div>
            <p-timeline [value]="events" align="alternate" class="customized-timeline">
                <ng-template pTemplate="marker" let-event>
                    <span
                    class="flex w-8 h-8 items-center justify-center text-white rounded-full z-10 shadow-sm"
                    [style]="{ 'background-color': event.color }"
                    >
                    <i [class]="event.icon"></i>
                    </span>
                </ng-template>

                <ng-template pTemplate="content" let-event>
                    <p-card [header]="event.status" [subheader]="event.date" class="rounded-border border border-surface">
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae.
                    </p>
                    </p-card>
                </ng-template>
            </p-timeline>
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

    events = [
    { status: 'Aberta', date: '2025-09-01', icon: 'pi pi-info-circle', color: '#727272ff' },
    { status: 'Orçada', date: '2025-09-03', icon: 'pi pi-file', color: '#9f510cff' },
    { status: 'Rejeitada', date: '2025-09-05', icon: 'pi pi-times-circle', color: '#ce0e0eff' },
  ];

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