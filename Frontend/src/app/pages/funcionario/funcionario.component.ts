import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-funcionario',
  templateUrl: './funcionario.component.html',
  styleUrls: ['./funcionario.component.css']
})
export class FuncionarioComponent implements OnInit {

  funcionario = {
    nome: 'João Vitor',
    cargo: 'Técnico de Suporte',
    setor: 'Manutenção',
  };

  chamados = [
    { id: 1, titulo: 'Troca de HD', status: 'Em andamento' },
    { id: 2, titulo: 'Formatação de notebook', status: 'Pendente' },
    { id: 3, titulo: 'Limpeza de gabinete', status: 'Concluído' }
  ];

  constructor() { }

  ngOnInit(): void {
  }
}