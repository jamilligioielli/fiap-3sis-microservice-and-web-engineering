import { Component } from '@angular/core';

interface Produto{
  nome: string;
  preco: number;
  promocao: boolean;
}

@Component({
  selector: 'app-q9',
  templateUrl: './q9.component.html',
})
export class Q9Component {
  produtos: Produto[] = [
    {
      nome: 'Notebook',
      preco: 3000,
      promocao: true,
    },
    {
      nome: 'Mouse',
      preco: 50,
      promocao: false
    }
  ]
}
