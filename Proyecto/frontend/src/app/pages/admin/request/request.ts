import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OrdersService } from '../../../services/orders';

type EstadoPedido = 'PENDIENTES' | 'ENTREGADOS' | 'CANCELADOS';

type Pedido = {
  _id?: string;
  folio: string;
  clienteId: string;
  cliente: string;
  productos: Array<{
    productoId?: string;
    id?: string;
    nombre: string;
    cantidad: number;
  }> | string;
  total: number;
  fecha: string;
  estado: EstadoPedido;
};

@Component({
  selector: 'app-request',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './request.html',
  styleUrl: './request.css',
})
export class Request implements OnInit {
  estadoActivo: EstadoPedido = 'PENDIENTES';
  pedidos: Pedido[] = [];
  clienteIdFiltro = '';
  cargando = false;
  error = '';
  mensaje = '';
  actualizandoPedidoId = '';

  estados: EstadoPedido[] = ['PENDIENTES', 'ENTREGADOS', 'CANCELADOS'];

  constructor(
    private ordersService: OrdersService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarPedidos();
  }

  cargarPedidos() {
    this.cargando = true;
    this.error = '';

    this.ordersService.getOrders(this.clienteIdFiltro.trim()).subscribe({
      next: (orders) => {
        this.pedidos = orders;
        this.cargando = false;
        this.cd.detectChanges();
      },
      error: () => {
        this.error = 'No fue posible cargar los pedidos.';
        this.cargando = false;
        this.cd.detectChanges();
      }
    });
  }

  seleccionarEstado(estado: EstadoPedido) {
    this.estadoActivo = estado;
  }

  buscarPorCliente() {
    this.cargarPedidos();
  }

  limpiarFiltroCliente() {
    this.clienteIdFiltro = '';
    this.cargarPedidos();
  }

  completarPedido(pedido: Pedido) {
    if (!pedido._id) {
      console.error('Error: El pedido no tiene un ID válido.');
      this.error = 'Error: El pedido no tiene un ID válido.';
      return;
    }
    this.actualizarEstadoPedido(pedido, 'ENTREGADOS');
  }

  cancelarPedido(pedido: Pedido) {
    if (!pedido._id) {
      console.error('Error: El pedido no tiene un ID válido.');
      this.error = 'Error: El pedido no tiene un ID válido.';
      return;
    }
    this.actualizarEstadoPedido(pedido, 'CANCELADOS');
  }

  get pedidosFiltrados() {
    return this.pedidos.filter((pedido) => pedido.estado === this.estadoActivo);
  }

  getEstadoDescripcion(estado: EstadoPedido): string {
    const descripciones: Record<EstadoPedido, string> = {
      'PENDIENTES': 'pendientes',
      'ENTREGADOS': 'entregados',
      'CANCELADOS': 'cancelados'
    };
    return descripciones[estado] || estado;
  }

  getProductosPedido(pedido: Pedido) {
    if (typeof pedido.productos === 'string') {
      return pedido.productos;
    }

    return pedido.productos
      .map((producto) => {
        const productoId = producto.productoId || producto.id || 'SIN-ID';
        return `${producto.nombre} x${producto.cantidad} (ID: ${productoId})`;
      })
      .join(', ');
  }

  private actualizarEstadoPedido(pedido: Pedido, estado: EstadoPedido) {
    if (!pedido._id) {
      this.error = 'Error: El pedido no tiene un ID válido.';
      console.error('Intento de actualizar pedido sin ID:', pedido);
      this.cd.detectChanges();
      return;
    }

    if (this.actualizandoPedidoId) {
      console.warn('Una actualización está en progreso');
      return;
    }

    this.actualizandoPedidoId = pedido._id;
    this.error = '';
    this.mensaje = '';
    this.cd.detectChanges();

    console.log(`Actualizando pedido ${pedido._id} a estado ${estado}`);

    this.ordersService.updateOrderStatus(pedido._id, estado).subscribe({
      next: (response) => {
        console.log('Respuesta exitosa del servidor:', response);
        pedido.estado = estado;
        this.mensaje = `Pedido ${pedido.folio} actualizado a ${estado} exitosamente.`;
        this.error = '';
        this.actualizandoPedidoId = '';
        this.cd.detectChanges();
        
        setTimeout(() => {
          console.log('Recargando lista de pedidos...');
          this.cargarPedidos();
        }, 1500);
      },
      error: (error) => {
        this.actualizandoPedidoId = '';
        console.error('Error al actualizar pedido:', error);
        console.error('Detalles de error:', error.error);
        
        const errorMsg = error?.error?.message || 
                        error?.message || 
                        'No fue posible actualizar el pedido en la base de datos.';
        this.error = `Error: ${errorMsg}`;
        this.mensaje = '';
        this.cd.detectChanges();
      }
    });
  }
}
