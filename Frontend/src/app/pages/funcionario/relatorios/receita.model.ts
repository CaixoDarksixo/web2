// interface p/ dados da receita,
// parecido à entidade @Entity no backend

export interface Receita {
  id: number; // Backends geralmente enviam um ID
  data: string; // Esperando AAAA/MM/DD
  valor: number;
  categoria: string;
}

//dados juntos por categoria
export interface CategoriaAgrupada {
  categoria: string;
  total: number;
}