import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DirectivaComponent } from './directiva/directiva.component';
import { ClientesComponent } from './clientes/clientes.component';
import { ClienteService } from './clientes/cliente.service';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule }  from '@angular/common/http';
import { FormComponent } from './clientes/form.component';
import { FormsModule } from '@angular/forms';


//Registrando el locale ES a nivel global de la app, tambien el el 'providers'
import { registerLocaleData } from '@angular/common';
import LocaleES from '@angular/common/locales/es';
registerLocaleData(LocaleES);

//Se establece los mappinga para cada componente asociados cada uno a una URL
const rutas: Routes = [
  {path: '', redirectTo: '/clientes', pathMatch: 'full'},
  {path: 'directivas', component: DirectivaComponent},
  {path: 'clientes', component: ClientesComponent},
  {path: 'clientes/form', component: FormComponent},
  {path: 'clientes/form/:id', component: FormComponent}
];

//**En un repositorio donde se registran clases de componente o servicios del modulo
//declarations: registra las clases de componente
//imports: registran los pipe o modulos para trabajar con HTTP, REST, configuraciones de DB, etc...
//providers: para clases servicio que contienen logica de negocio
//bootstrap: componente principal que se va a cargar
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DirectivaComponent,
    ClientesComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(rutas)
  ],
  providers: [ClienteService, {provide: LOCALE_ID, useValue: 'es_ES'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
