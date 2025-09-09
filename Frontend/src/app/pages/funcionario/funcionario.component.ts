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

  constructor(private funcionarioService: FuncionarioService) {}

  ngOnInit(): void {
    // Inicializa os dados vindos do service
    this.funcionario = this.funcionarioService.getFuncionario();
    this.chamados = this.funcionarioService.getChamados();
    this.estatisticas = this.funcionarioService.getEstatisticas();
  }

  // Método para exibir badge de status com cor
  getStatusClass(status: string): string {
    switch (status) {
      case 'Concluído': return 'p-badge-success';
      case 'Em andamento': return 'p-badge-warning';
      case 'Pendente': return 'p-badge-danger';
      default: return 'p-badge-info';
    }
  }
}