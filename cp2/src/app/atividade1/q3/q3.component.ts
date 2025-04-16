import { Component } from '@angular/core';

@Component({
  selector: 'app-q3',
  templateUrl: './q3.component.html',
})
export class Q3Component {
  idade: number = 18;

  atualizaIdade(aumentar?: boolean) {
    aumentar ? this.idade++ : this.idade--;
  }
}
