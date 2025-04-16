import { Component } from '@angular/core';

@Component({
  selector: 'app-q8',
  templateUrl: './q8.component.html',
})
export class Q8Component {
  email: string = ''
  senha: number | undefined


  validarCampos(): boolean{
    return !this.email?.includes('@') || this.senha!.toString().length < 6 ? true : false;
  }
}
