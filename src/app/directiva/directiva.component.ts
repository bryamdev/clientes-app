import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-directiva',
  templateUrl: './directiva.component.html'
})
export class DirectivaComponent {

  public lenguajes: String[] = ['Ruby', 'Python', 'Java', 'C#'];

  public habilitar: boolean = true;

  public setHabilitar(): void{
    this.habilitar = (this.habilitar == true) ? false : true;
  }

}
