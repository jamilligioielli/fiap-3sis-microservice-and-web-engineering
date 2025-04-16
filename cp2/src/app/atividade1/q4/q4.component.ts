import { Component } from '@angular/core';

@Component({
  selector: 'app-q4',
  templateUrl: './q4.component.html',
})
export class Q4Component {
  tarefas: string[] = ['Estudar Angular', 'Fazer exercícios', 'Revisar código']

  removerTarefa(index: number) {
    this.tarefas = this.tarefas.filter((item, i)=> i !== index)
  }
}
