import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent implements OnInit {
  @Input() cliente: any; // Recibe el cliente a editar desde el componente padre
  @Output() cerrarModal: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() guardarCambios: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
    this.cargarDatos()
    }

  cargarDatos(): void {
    console.log('Datos del cliente:', this.cliente);
  }

  cerrar(): void {
    // Emitir evento para indicar que se debe cerrar el modal
    this.cerrarModal.emit(true);
  }

  guardar(): void {
    // Emitir evento para enviar los cambios del cliente al componente padre
    this.guardarCambios.emit(this.cliente);
  }
}
