import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent {
  producto: any = {};


  constructor(
    private productoService: ProductoService,
    private router: Router
  ) { }

  crearProducto() {
    this.productoService.crearProducto(this.producto).subscribe(
      (data) => {
        this.router.navigate(['/productos']);
      },
      (error) => {
        console.error('Error al crear producto:', error);
      }
    )
  }

}