import { Component } from '@angular/core';
import { ProductoService } from 'src/app/services/producto.service';
import { EditarProductoComponent } from '../editar-producto/editar-producto.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.css']
})
export class ListaProductosComponent {
  productos: any[] = [];

  constructor(
    private productoService: ProductoService,
    private dialog: MatDialog
  ) {  }

  ngOnInit(): void {
    this.listarProductos();
  }

  listarProductos() {
    this.productoService.listaProductos().subscribe(
      (data: any) => {
        console.log('Productos:', data);
        this.productos = data;
      },
      error => {
        console.error('Error al obtener productos:', error);
      }
    );
  }

  eliminarProducto(id: number) {
    this.productoService.eliminarProducto(id).subscribe(
      (data: any) => {
        console.log('Producto eliminado:', data);
        this.listarProductos();
      },
      error => {
        console.error('Error al eliminar producto:', error);
      }
    );
  }

  editarProducto(producto: any) {
    const dialogRef = this.dialog.open(EditarProductoComponent, {
      width: '400px',
      data: { producto }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.listarProductos();
      }
    });
  }
}
