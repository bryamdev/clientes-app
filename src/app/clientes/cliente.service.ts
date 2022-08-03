import { Injectable } from '@angular/core';
import {formatDate, DatePipe } from '@angular/common';
import LocaleES from '@angular/common/locales/es';

//import { CLIENTES } from './clientes.json';
import { Cliente } from './cliente';
import { HttpClient, HttpHeaders } from '@angular/common/http';

//Para implementar programacion reactiva, asincrona y paralela, atravez de flujos de datos(Stream)
//observable patron de diseño observador
import { Observable, of, throwError} from 'rxjs';

import { map, catchError, tap } from 'rxjs/operators';
import swal from 'sweetalert2';
import { Router } from '@angular/router';



//Este decorador es para clases de servicio que contienen logica de negocio
@Injectable()
export class ClienteService {

  private urlEndPointClientes: string = "http:///localhost:8080/api/clientes";
  //Objeto con los headers del request
  private headers: HttpHeaders = new HttpHeaders({'Content-Type' : 'application/json'});

  constructor(private http: HttpClient,
    private router: Router) {  }

  //*Para que sea un metodo reactivo debe retornar un Stream(entrada o salida)
  //*Se define el sujeto observable(para detectar algun cambio o actualizacion) 'Cliente[]'...
  //... cuando hay algun cambio se notifica a los observadores que se suscriben a este observable
  public getClientes(): Observable<Cliente[]>{
    
    //Forma casteando directamente el flujo Stream a Cliente[]
    //return this.http.get<Cliente[]>(this.urlEndPointClientes);

    //map intercepta los datos del flujo Stream lo cambia de Object a Cliente[] y lo retorna de vuelta al flujo
    //Luego se modifica con 'map' los atributos de cada uno de los elementos del Cliente[]
    return this.http.get(this.urlEndPointClientes).pipe(
      map(resp => {
        let  clientes = resp as Cliente[];
        return clientes.map(cliente => {
            cliente.nombre = cliente.nombre.toUpperCase();
            //cliente.createAt = formatDate(cliente.createAt, 'EEEE dd, MMMM yyyy', 'es-ES');
            /* //Otra forma de parsear la fecha
            let datePipe = new DatePipe('en-US'); 
            cliente.createAt = datePipe.transform(cliente.createAt, 'dd/MM/yyyy');*/
            return cliente;
        });
      }),
      //tap permite obtener los elementos del Stream pero no los modifica
      //Tanto el tipo de resp(Cliente[]) como los nombres de los clientes fueron modificados por el 'map'
      tap(resp =>{
        console.log("Lista de clientes");
        resp.forEach(cliente =>{
          console.log(cliente.nombre);
        })
      })
    );

  }

  //catchError: operador que intercepta el flujo del observable
  //... si encuentra un fallo(codigo de estado: 404, 500...) se obtiene un objeto de error con el response
  public getCliente(id: number): Observable<Cliente>{
    return this.http.get<Cliente>(`${this.urlEndPointClientes}/${id}`).pipe(
      catchError(e => {

        if(e.status == 404){
          this.router.navigate(['/clientes']);
          console.error(e.error.mensaje);
          swal.fire('Error al obtener el usuario!', e.error.mensaje, 'error');
          //retorna el error convetido en observable
          return throwError(e);
        }

      })
    );
  }

  public create(cliente: Cliente): Observable<any>{
    return this.http.post<any>(this.urlEndPointClientes, cliente, {headers:this.headers}).pipe(
      catchError(e => {

        if(e.status == 400){
          return throwError(e);
        } 

        if(e.status == 500){
          console.error(e.error.error);
          swal.fire('Error al crear el cliente', e.error.mensaje, 'error');
          return throwError(e);
        }

      })
    );
  }

  public update(cliente: Cliente): Observable<any>{
    return this.http.put<any>(`${this.urlEndPointClientes}/${cliente.id}`, cliente, {headers: this.headers}).pipe(
      catchError(e => { 

        if(e.status == 400){
          return throwError(e);
        }

        if(e.status == 404){
          console.log(e.error.mensaje);
          swal.fire('Error al editar el cliente', e.error.mensaje, 'error');
          return throwError(e);
        }

        if(e.status == 500){
          console.error(e.error.error);
          swal.fire('Error al editar el cliente', e.error.mensaje, 'error');
          return throwError(e);
        }

      })
    );
  }

  public delete(id: number): Observable<any>{
    return this.http.delete(`${this.urlEndPointClientes}/${id}`).pipe(
      catchError(e => { 

        if(e.status == 400){
          return throwError(e);
        }

        if(e.status == 500){
          console.error(e.error.error);
          swal.fire('Error al eliminar el cliente', e.error.mensaje, 'error');
          return throwError(e);
        }

        console.error(e.error.error);
        return throwError(e);

      })
    );
  }
}
