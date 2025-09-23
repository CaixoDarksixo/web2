import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'relatorios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
<div class="card p-6 space-y-6">
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
      <button (click)="gerarRelatorioReceitas()" 
        class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition w-full">
         Receitas (PDF)
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
    <table class="min-w-full border border-gray-300 rounded-lg">
      <thead class="bg-gray-100">
        <tr>
          <th class="px-4 py-2 border">Data</th>
          <th class="px-4 py-2 border">Valor</th>
          <th class="px-4 py-2 border">Categoria</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let r of getReceitasFiltradas()">
          <td class="px-4 py-2 border">{{ r.data }}</td>
          <td class="px-4 py-2 border">R$ {{ r.valor.toFixed(2) }}</td>
          <td class="px-4 py-2 border">{{ r.categoria }}</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!--Relatório categoria -->
  <div class="mt-8 flex gap-4">
    <button (click)="gerarRelatorioCategorias()" 
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
    .card {
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    }
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
export class Relatorios {
  filtro = {
    dataInicial: '',
    dataFinal: ''
  };

  receitas = [
    { data: '2025-09-01', valor: 500, categoria: 'Categoria A' },
    { data: '2025-09-01', valor: 300, categoria: 'Categoria B' },
    { data: '2025-09-02', valor: 700, categoria: 'Categoria C' },
    { data: '2025-09-03', valor: 200, categoria: 'Categoria A' },
  ];

  getReceitasFiltradas() {
    let dados = this.receitas;
    if (this.filtro.dataInicial) {
      dados = dados.filter(r => r.data >= this.filtro.dataInicial);
    }
    if (this.filtro.dataFinal) {
      dados = dados.filter(r => r.data <= this.filtro.dataFinal);
    }
    return dados;
  }

  gerarRelatorioReceitas() {
    const dadosFiltrados = this.getReceitasFiltradas();
    const agrupado: { [data: string]: number } = {};
    dadosFiltrados.forEach(r => {
      agrupado[r.data] = (agrupado[r.data] || 0) + r.valor;
    });

    const rows = Object.entries(agrupado).map(([data, total]) => [data, `R$ ${total.toFixed(2)}`]);
    const totalReceitas = dadosFiltrados.reduce((acc, r) => acc + r.valor, 0);

    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text('Relatório de Receitas por Dia', 14, 15);
    doc.setFontSize(11);
    doc.text(`Data Inicial: ${this.filtro.dataInicial || '---'}`, 14, 25);
    doc.text(`Data Final: ${this.filtro.dataFinal || '---'}`, 14, 32);
    doc.text(`Total de Receitas: R$ ${totalReceitas.toFixed(2)}`, 14, 39);

    autoTable(doc, {
      head: [['Data', 'Total Receitas']],
      body: rows,
      startY: 50
    });

    doc.save('relatorio-receitas.pdf');
  }

  gerarRelatorioCategorias() {
    const agrupado: { [cat: string]: number } = {};
    this.receitas.forEach(r => {
      agrupado[r.categoria] = (agrupado[r.categoria] || 0) + r.valor;
    });

    const rows = Object.entries(agrupado).map(([cat, total]) => [cat, `R$ ${total.toFixed(2)}`]);
    const totalReceitas = this.receitas.reduce((acc, r) => acc + r.valor, 0);

    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text('Relatório de Receitas por Categoria', 14, 15);
    doc.setFontSize(11);
    doc.text(`Total de Receitas: R$ ${totalReceitas.toFixed(2)}`, 14, 25);

    autoTable(doc, {
      head: [['Categoria', 'Total Receitas']],
      body: rows,
      startY: 35
    });

    doc.save('relatorio-categorias.pdf');
  }

  exportarCSV() {
    const linhas = this.receitas.map(r => `${r.data},${r.valor},${r.categoria}`);
    const conteudo = "data,valor,categoria\n" + linhas.join("\n");
    const blob = new Blob([conteudo], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'relatorio.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  }

  limparFiltros() {
    this.filtro.dataInicial = '';
    this.filtro.dataFinal = '';
  }
}
