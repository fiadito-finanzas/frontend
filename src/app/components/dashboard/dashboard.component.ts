import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EstablecimientoService } from 'src/app/services/establecimiento.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  clientes: any[] = [];

  constructor(
    private establecimientoService: EstablecimientoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.obtenerClientesPorEstablecimiento();
  }

  obtenerClientesPorEstablecimiento(): void {
    this.establecimientoService.obtenerClientesPorEstablecimiento().subscribe(
      (response: any) => {
        console.info(response);
        this.clientes = response;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  verCliente(clienteId: any): void {
    this.router.navigate(['/detalle-cliente', clienteId]);
  }
  
}
