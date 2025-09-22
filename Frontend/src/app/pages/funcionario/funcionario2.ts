import { Component, OnInit } from '@angular/core';
import { FuncionarioService } from './funcionario.service';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { BadgeModule } from 'primeng/badge';
import { ChartModule } from 'primeng/chart';
import { MessageModule } from 'primeng/message';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-funcionario',
  imports: 
  [
    CommonModule,
    CardModule,
    TableModule,
    BadgeModule,
    ChartModule,
    MessageModule,
    FormsModule
  ],
  standalone: true,
  templateUrl: './funcionario.component.html'
})
export class FuncionarioComponent implements OnInit {

  funcionario: any;
  chamados: any[] = [];
  estatisticas: any;
  historico: any[] = [];
  notificacoes: any[] = [];

  chamadosFiltrados: any[] = [];
  filtro: string = '';

  chartData: any;
  chartOptions: any;

  constructor(private funcionarioService: FuncionarioService) {}

  ngOnInit(): void {
    this.funcionario = this.funcionarioService.getFuncionario();
    this.chamados = this.funcionarioService.getChamados();
    this.estatisticas = this.funcionarioService.getEstatisticas();
    this.historico = this.funcionarioService.getHistorico();
    this.notificacoes = this.funcionarioService.getNotificacoes();

    this.chamadosFiltrados = [...this.chamados];

    this.setupChart();
  }

  setupChart() {
    this.chartData = {
      labels: ['Concluídos', 'Pendentes', 'Em Andamento'],
      datasets: [
        {
          data: [
            this.estatisticas.concluidos,
            this.estatisticas.pendentes,
            this.estatisticas.andamento
          ],
          backgroundColor: ['#22C55E', '#EF4444', '#F59E0B']
        }
      ]
    };

    this.chartOptions = {
      plugins: {
        legend: {
          labels: {
            color: '#495057'
          }
        }
      }
    };
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Concluído': return 'p-badge-success';
      case 'Em andamento': return 'p-badge-warning';
      case 'Pendente': return 'p-badge-danger';
      default: return 'p-badge-info';
    }
  }

  filtrarChamados() {
    if (!this.filtro) {
      this.chamadosFiltrados = [...this.chamados];
      return;
    }
    this.chamadosFiltrados = this.chamados.filter(c =>
      c.titulo.toLowerCase().includes(this.filtro.toLowerCase()) ||
      c.status.toLowerCase().includes(this.filtro.toLowerCase())
    );
  }
}