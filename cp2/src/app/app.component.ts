import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Atividade1Module } from './atividade1/atividade1.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Atividade1Module],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
}
