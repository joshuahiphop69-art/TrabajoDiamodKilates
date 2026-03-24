import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

type EstadoPedido = 'PENDIENTES' | 'ENTREGADOS' | 'CANCELADOS';

@Component({
  selector: 'app-request',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './request.html',
  styleUrl: './request.css',
})
export class Request {
  estadoActivo: EstadoPedido = 'PENDIENTES';

  pedidos = [
    {
      folio: 'PED-1001',
      clienteId: 'CLI-204',
      cliente: 'Mariana Soto',
      productos: 'Anillo de oro, collar de diamante',
      total: 18450,
      fecha: '20/03/2026',
      estado: 'PENDIENTES' as EstadoPedido,
    },
    {
      folio: 'PED-1002',
      clienteId: 'CLI-117',
      cliente: 'Luis Herrera',
      productos: 'Pulsera de plata',
      total: 2950,
      fecha: '19/03/2026',
      estado: 'PENDIENTES' as EstadoPedido,
    },
    {
      folio: 'PED-0991',
      clienteId: 'CLI-088',
      cliente: 'Daniela Cruz',
      productos: 'Aretes de oro blanco',
      total: 6300,
      fecha: '16/03/2026',
      estado: 'ENTREGADOS' as EstadoPedido,
    },
    {
      folio: 'PED-0984',
      clienteId: 'CLI-051',
      cliente: 'Renata Vargas',
      productos: 'Anillo de compromiso',
      total: 22700,
      fecha: '14/03/2026',
      estado: 'CANCELADOS' as EstadoPedido,
    },
  ];

  estados: EstadoPedido[] = ['PENDIENTES', 'ENTREGADOS', 'CANCELADOS'];

  seleccionarEstado(estado: EstadoPedido) {
    this.estadoActivo = estado;
  }

  get pedidosFiltrados() {
    return this.pedidos.filter((pedido) => pedido.estado === this.estadoActivo);
  }
}
