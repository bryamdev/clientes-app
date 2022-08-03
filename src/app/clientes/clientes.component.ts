import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import swal from 'sweetalert2';
import { tap } from 'rxjs/operators';



@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})
export class ClientesComponent implements OnInit {


  clientes: Cliente[];

  //INJECTION
  //El parametro crea un atributo de clase e inyecta la instancia en el
  constructor(private clienteService: ClienteService) { }

  //*Evento que se ejecuta cuando se inicia el componente
  //*El observador(cliente/navegador) se suscribe al metodo que establecio el observable...
  //... para obtener el resultado(si hay algun cambio) y poblarlo al atributo de clase.
  ngOnInit(): void {
    this.clienteService.getClientes().pipe(
      tap(clientes => {
        console.log("listado de clientes desde componente:")
        clientes.forEach(cliente => {
          console.log(cliente.nombre);
        });
      })
    ).subscribe( clientes =>  this.clientes = clientes);
  }

  public delete(cliente: Cliente): void {

    swal.fire({
      title: 'Estas seguro?',
      text: `Seguro quieres eliminar el cliente ${cliente.nombre}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.value) {

        this.clienteService.delete(cliente.id).subscribe(
          res => {

            //A la lista visual de los clientes se le elimina el cliente eliminado.
            this.clientes = this.clientes.filter(cli => cli != cliente);

            swal.fire(
              'Cliente eliminado!',
              `El cliente ${cliente.nombre} se ha eliminado con exito!`,
              'success'
            )  
          }
        );
      }
    })
  }


}
