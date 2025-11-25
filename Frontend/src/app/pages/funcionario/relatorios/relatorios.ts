import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';


import { RelatorioService } from './relatorio.service';
import { Receita, CategoriaAgrupada } from './receita.model';

@Component({
  selector: 'relatorios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
<div class="card">
  <div class="font-semibold text-2xl mb-6">Relatórios</div>

  <!--Filtros -->
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <div>
      <label class="block mb-1">Data Inicial</label>
      <input type="date" [(ngModel)]="filtro.dataInicial" class="w-full p-2 border rounded-lg"/>
    </div>
    <div>
      <label class="block mb-1">Data Final</label>
      <input type="date" [(ngModel)]="filtro.dataFinal" class="w-full p-2 border rounded-lg"/>
    </div>
    <div class="flex items-end gap-2">
      <button (click)="carregarReceitas()" 
        class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition w-full">
         Buscar
      </button>
      <button (click)="limparFiltros()" 
        class="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition w-full">
         Limpar
      </button>
    </div>
  </div>

  <!--Tabela com os dados filtrados-->
  <div class="mt-6">
    <h3 class="font-semibold text-lg mb-2">Prévia dos Dados</h3>

    <table class="min-w-full border border-gray-300 rounded-lg" *ngIf="receitas.length > 0; else vazio">
      <thead class="bg-surface-200 dark:bg-surface-800">
        <tr>
          <th class="px-4 py-2 border">Data</th>
          <th class="px-4 py-2 border">Valor</th>
          <th class="px-4 py-2 border">Categoria</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let r of receitas">
          <td class="px-4 py-2 border">{{ r.data }}</td>
          <td class="px-4 py-2 border">R$ {{ r.valor.toFixed(2) }}</td>
          <td class="px-4 py-2 border">{{ r.categoria }}</td>
        </tr>
      </tbody>
    </table>

    <ng-template #vazio>
      <p class="text-gray-600 mt-3">Nenhum dado encontrado.</p>
    </ng-template>
  </div>

  <!--Relatório categoria -->
  <div class="mt-8 flex gap-4">
    <button (click)="gerarRelatorioReceitasPDF()" 
      class="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition">
       Receitas (PDF)
    </button>

    <button (click)="gerarRelatorioCategoriasPDF()" 
      class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
       Relatório por Categoria
    </button>

    <button (click)="exportarCSV()" 
      class="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition">
       Exportar CSV
    </button>
  </div>
</div>
  `,
  styles: [`
    table {
      border-collapse: collapse;
      width: 100%;
      font-size: 14px;
    }
    th {
      text-align: left;
      font-weight: 600;
    }
    td, th {
      border: 1px solid #d1d5db;
      padding: 8px;
    }
  `]
})
export class Relatorios implements OnInit {

  private relatorioService = inject(RelatorioService);

  filtro = {
    dataInicial: '',
    dataFinal: ''
  };

  receitas: Receita[] = [];
  categorias: CategoriaAgrupada[] = [];

  ngOnInit() {
    this.carregarReceitas();
  }

  carregarReceitas() {
    this.relatorioService
      .getReceitas(this.filtro.dataInicial, this.filtro.dataFinal)
      .subscribe({
        next: (dados) => this.receitas = dados,
        error: () => alert('Erro ao carregar receitas do servidor.')
      });
  }

  gerarRelatorioReceitasPDF() {
  const dadosFiltrados = this.receitas;

  const agrupado: { [data: string]: number } = {};
  dadosFiltrados.forEach(r => {
    agrupado[r.data] = (agrupado[r.data] || 0) + r.valor;
  });

  const rows = Object.entries(agrupado).map(([data, total]) => [data, `R$ ${total.toFixed(2)}`]);

  const totalReceitas = dadosFiltrados.reduce((acc, r) => acc + r.valor, 0);

  const doc = new jsPDF();
  doc.setFontSize(14);
  doc.text('Relatório de Receitas por Dia', 14, 15);

  autoTable(doc, {
    head: [['Data', 'Total']],
    body: rows,
    startY: 25
  });


  const finalY = (doc as any).lastAutoTable.finalY;

  doc.text(`Total Geral: R$ ${totalReceitas.toFixed(2)}`, 14, finalY + 10);

  doc.save('relatorio-receitas.pdf');
}


gerarRelatorioCategoriasPDF() {
this.relatorioService.getReceitasAgrupadasPorCategoria().subscribe({
next: dados => {
  this.categorias = dados;

  const rows = dados.map(c => [c.categoria, `R$ ${c.total.toFixed(2)}`]);
  const total = dados.reduce((sum, c) => sum + c.total, 0);

  const doc = new jsPDF();
  doc.setFontSize(14);
  doc.text('Relatório de Categorias', 14, 15);


  autoTable(doc, {
    head: [['Categoria', 'Total']],
    body: rows,
    startY: 25
    });

  const finalY = (doc as any).lastAutoTable.finalY;

  doc.text(`Total Geral: R$ ${total.toFixed(2)}`, 14, finalY + 10);

  doc.save('relatorio-categorias.pdf');
},
error: () => alert('Erro ao buscar categorias.')
  });
}



exportarCSV() {
  if (this.receitas.length === 0) {
    alert('Nenhum dado para exportar.');
    return;
  }


  const linhas = this.receitas
    .map(r => `${r.data},${r.valor},${r.categoria}`);


  const conteudo = "data,valor,categoria\n" + linhas.join("\n");
  const blob = new Blob([conteudo], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);


  const a = document.createElement('a');
  a.href = url;
  a.download = 'receitas.csv';
  a.click();



    URL.revokeObjectURL(url);
  }


  limparFiltros() {

    this.filtro = { dataInicial: '', dataFinal: '' };
    this.carregarReceitas();

  }
}
