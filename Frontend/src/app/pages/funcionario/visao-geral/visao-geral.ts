import { Component, inject, OnInit } from '@angular/core';
import { Table, TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { DatePipe } from '@angular/common';
import { TruncatePipe } from '@/shared/pipes/truncate-pipe';
import { RequestService } from '@/core/services/request.service';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { Request } from '@/core/models/request.model';

@Component({
    selector: 'visao-geral',
    standalone: true,
    imports: [
    TableModule,
    TagModule,
    DatePipe,
    TruncatePipe,
    ButtonModule,
    InputIconModule,
    IconFieldModule,
    InputTextModule
    ],
    templateUrl: './visao-geral.html'
})
export class VisaoGeral implements OnInit {
    cols = [
        { field: 'dataInicio', header: 'Data/Hora de Abertura' },
        { field: 'descEquipamento', header: 'Descrição do Equipamento' },
        { field: "cliente", header: 'Cliente' },
        { field: 'Ação', header: 'Ação' }
    ];

    requests!: Request[];

    requestService = inject(RequestService);
    router = inject(Router);

    ngOnInit() {
        this.requestService.getRequests({status: "ABERTA"}).subscribe((data: Request[]) => {
            this.requests = data;
        console.log(data);
        });
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

}
