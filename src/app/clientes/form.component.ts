import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  public cliente: Cliente = new Cliente();
  public titulo: string = 'Formulario crear cliente';
  public errores: String[];

  constructor(private clienteService: ClienteService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarCliente();
  }

  public cargarCliente(): void{
    //se suscribe al observador que detecta un parametro de la url
    //guarda los parametros en un arreglo
    this.activatedRoute.params.subscribe(
      params => {
        let id = params['id'];
        if(id){
          console.log(id);
          this.clienteService.getCliente(id).subscribe(
            cliente => this.cliente = cliente
          );
        }
      }  
    );
  }

  public create(): void{
    this.clienteService.create(this.cliente).subscribe(
        result => {
          this.router.navigate(['/clientes']);
          swal.fire('Nuevo cliente', `Cliente ${result.cliente.nombre} creado con exito`, 'success');
        },
        error => {
          //Obtiene el objeto de error enviado desde el Service,
          //... recupera el valor del atributo 'error' que contiene el JSON de respuesta de error del backend
          //... y lo pobla al atributo errors
          this.errores = error.error.errors as String[];
          console.error("Errores desde backend!: " + this.errores);
        }
      );    
  }

  public update(): void{
    this.clienteService.update(this.cliente).subscribe(
      result => {
        this.router.navigate(['/clientes'])
        swal.fire('Cliente actualizado', `El cliente ${result.cliente.nombre} se actualizó con exito`, 'success');
      },
      error => {
        this.errores = error.error.errors as String[];
        console.error("Errores desde backend!: " + this.errores);
      }
    );
  }


}
