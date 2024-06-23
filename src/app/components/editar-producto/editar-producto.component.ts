import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.css']
})
export class EditarProductoComponent {
  productoForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<EditarProductoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private productoService: ProductoService
  ) {
    this.productoForm = this.fb.group({
      nombre: [data.producto.nombre, Validators.required],
      precio: [data.producto.precio, Validators.required],
      descripcion: [data.producto.descripcion, Validators.required]
    });
  }

  actualizarProducto() {
    if (this.productoForm.valid) {
      const productoActualizado = {
        id: this.data.producto.id,
        ...this.productoForm.value
      };
      this.productoService.actualizarProducto(productoActualizado.id, productoActualizado).subscribe(
        (response) => {
          console.log('Producto actualizado:', response);
          this.dialogRef.close(true);
        },
        (error) => {
          console.error('Error al actualizar producto:', error);
        }
      );
    }
  }

  cancelar() {
    this.dialogRef.close(false);
  }
}
