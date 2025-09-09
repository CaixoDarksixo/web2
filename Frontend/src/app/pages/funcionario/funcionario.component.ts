import { Component, OnInit } from '@angular/core';
import { FuncionarioService } from './funcionario.service';

@Component({
  selector: 'app-funcionario',
  templateUrl: './funcionario.component.html',
  styleUrls: ['./funcionario.component.css']
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