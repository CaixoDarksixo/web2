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
    <div class="flex items-end">
    <button (click)="gerarRelatorioReceitas()" 
        class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition w-full">
        📄 Gerar Relatório de Receitas
    </button>
    </div>
</div>

<!--Relatório categoria -->
<div class="mt-8">
    <button (click)="gerarRelatorioCategorias()" 
    class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
    📊 Gerar Relatório por Categoria
    </button>
</div>
</div>
  `
})
export class Relatorios {
  filtro = {
    dataInicial: '',
    dataFinal: ''
  };

  //Dados fake para teste
  receitas = [
    { data: '2025-09-01', valor: 500, categoria: 'Categoria A' },
    { data: '2025-09-01', valor: 300, categoria: 'Categoria B' },
    { data: '2025-09-02', valor: 700, categoria: 'Categoria C' },
    { data: '2025-09-03', valor: 200, categoria: 'Categoria A' },
  ];

  //Relatório Dia
  gerarRelatorioReceitas() {

    //Filtra por data
    let dadosFiltrados = this.receitas;
    if (this.filtro.dataInicial) {
      dadosFiltrados = dadosFiltrados.filter(r => r.data >= this.filtro.dataInicial);
    }
    if (this.filtro.dataFinal) {
      dadosFiltrados = dadosFiltrados.filter(r => r.data <= this.filtro.dataFinal);
    }

    //Agrupa por data
    const agrupado: { [data: string]: number } = {};
    dadosFiltrados.forEach(r => {
      agrupado[r.data] = (agrupado[r.data] || 0) + r.valor;
    });

    const rows = Object.entries(agrupado).map(([data, total]) => [data, `R$ ${total.toFixed(2)}`]);
    const totalReceitas = dadosFiltrados.reduce((acc, r) => acc + r.valor, 0);

    //Gera o PDF
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

  //por Categoria
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
}
