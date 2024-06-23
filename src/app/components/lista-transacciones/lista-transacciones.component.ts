import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-transacciones',
  templateUrl: './lista-transacciones.component.html',
  styleUrls: ['./lista-transacciones.component.css']
})
export class ListaTransaccionesComponent {

  @Input() transacciones: any[] = [];
  @Input() loading: boolean = false;
  @Input() cuentaCorriente: any;
  

  constructor(private router: Router) { }

  ngOnInit(): void {
  }


  verTodasLasTransaccionesMensuales(): void {
    this.router.navigate(['/transacciones', this.cuentaCorriente.id]);
  }
}
