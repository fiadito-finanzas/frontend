import { formatDate } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-registrar-transaccion',
  templateUrl: './registrar-transaccion.component.html',
  styleUrls: ['./registrar-transaccion.component.css']
})
export class RegistrarTransaccionComponent {
  transaccion: any = {
    monto: 0,
    fecha: new Date(),
    tipo: '',
    cuotas: 0,
    cantidadPlazoGraciaT: 0,
    cantidadPlazoGraciaP: 0,
    interes: 0,
    productos: [] // Aquí se almacenarán los productos seleccionados
  };
  montoValido: boolean = true;
  productos: any[] = [];
  @Input() cuentaCorriente: any;
  @Output() transaccionRegistrada: EventEmitter<any> = new EventEmitter<any>();
  @Output() cerrarModal: EventEmitter<boolean> = new EventEmitter<boolean>();
  fechasPago: any[] = [];

  constructor(private productoService: ProductoService) {
    this.listarProductos();
  }

  listarProductos() {
    this.productoService.listaProductos().subscribe(
      (data: any) => {
        this.productos = data;
      },
      error => {
        console.error('Error al obtener productos:', error);
      }
    );
  }

  cerrar(): void {
    this.cerrarModal.emit();
  }

  tipoTransaccionChange(): void {
    if (this.transaccion.tipo === 'COMPRA_A_CUOTAS') {
      this.calcularFechasPago();
    } else {
      this.fechasPago = [];
    }
  }

  calcularFechasPago(): void {
    if (this.transaccion.cantidadPlazoGraciaT + this.transaccion.cantidadPlazoGraciaP >= this.transaccion.cuotas) {
      alert('La suma de los plazos de gracia total y parcial no puede ser mayor o igual que el número de cuotas menos uno.');
      return;
    }

    const plazoGraciaTotal = this.transaccion.cantidadPlazoGraciaT || 0;
    const plazoGraciaParcial = this.transaccion.cantidadPlazoGraciaP || 0;

    this.fechasPago = [];
    let fechaPago = new Date(this.cuentaCorriente.fechaPagoMensual);

    for (let i = 1; i <= this.transaccion.cuotas; i++) {
      if (i == 1) {
        fechaPago.setMonth(fechaPago.getMonth());
      } else {
        fechaPago.setMonth(fechaPago.getMonth() + 1);
      }

      this.fechasPago.push({
        numeroCuota: i,
        fechaPago: formatDate(fechaPago, 'yyyy-MM-dd', 'en-US')
      });
    }
  }

  validarPlazosGracia(): void {
    if (this.transaccion.cantidadPlazoGraciaT + this.transaccion.cantidadPlazoGraciaP >= this.transaccion.cuotas) {
      alert('La suma de los plazos de gracia total y parcial no puede ser mayor o igual que el número de cuotas menos uno.');
      this.transaccion.cantidadPlazoGraciaT = 0;
      this.transaccion.cantidadPlazoGraciaP = 0;
      return;
    }

    this.calcularFechasPago();
  }

  agregarProducto(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedIndex = selectElement.selectedIndex;
    const producto = this.productos[selectedIndex - 1]; // El índice -1 para ajustar por el primer <option> vacío
    const productoExistente = this.transaccion.productos.find((p: any) => p.id === producto.id);
    
    if (productoExistente) {
      productoExistente.cantidadSeleccionada = (productoExistente.cantidadSeleccionada || 0) + 1;
    } else {
      this.transaccion.productos.push({ ...producto, cantidadSeleccionada: 1 });
    }
    this.calcularMontoTotal();
  }
  eliminarProducto(producto: any) {
    this.transaccion.productos = this.transaccion.productos.filter((p: any) => p.id !== producto.id);
    this.calcularMontoTotal();
  }

  actualizarCantidad(producto: any, cantidad: number) {
    const productoExistente = this.transaccion.productos.find((p: any) => p.id === producto.id);
    if (productoExistente) {
      productoExistente.cantidad = cantidad;
    }
    this.calcularMontoTotal();
  }

  calcularMontoTotal() {
    this.transaccion.monto = this.transaccion.productos.reduce((total: number, producto: any) => total + (producto.precio * producto.cantidad), 0);
    this.validarMonto();
  }

  registrarTransaccion(): void {
    this.transaccion.cuentaCorrienteId = this.cuentaCorriente.id;
    this.transaccion.fecha = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
    if (this.transaccion.monto && this.transaccion.tipo) {
      if (this.transaccion.monto > this.cuentaCorriente.saldoCredito) {
        alert('El monto de la transacción no puede ser mayor al saldo disponible en la cuenta corriente.');
        return;
      }
      this.montoValido = this.transaccion.monto <= this.cuentaCorriente.saldoCredito;
      if (!this.montoValido) {
        return;
      }
      if (this.transaccion.tipo === 'COMPRA_A_CUOTAS' && !this.transaccion.cuotas) {
        alert('Debes ingresar la cantidad de cuotas');
        return;
      }
      this.transaccionRegistrada.emit(this.transaccion);
      this.cerrar();
    } else {
      alert('Debes completar todos los campos');
    }
    console.log('Transacción:', this.transaccion);
  }

  validarMonto(): void {
    this.montoValido = !this.transaccion.monto || this.transaccion.monto <= this.cuentaCorriente.saldoCredito;
  }
}
