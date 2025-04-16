import { Component } from '@angular/core';

interface Usuario{
  nome: string;
  idade: number;
}

@Component({
  selector: 'app-q6',
  templateUrl: './q6.component.html',
})
export class Q6Component {
  usuarios: Usuario[] = [
    {
      nome: 'Ana',
      idade: 25
    },
    {
      nome: 'Carlos',
      idade: 30
    }
  ]
}
