import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: String = 'clientes-app';
  curso: String = 'Spring Boot y Angular 9';
  profesor: String = 'El Peluca';
}
