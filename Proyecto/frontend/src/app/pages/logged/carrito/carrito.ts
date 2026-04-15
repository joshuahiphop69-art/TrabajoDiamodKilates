import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartItem, CartService } from '../../../services/cart';
import { OrdersService } from '../../../services/orders';
import { Perfiles } from '../../../services/perfiles';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './carrito.html',
  styleUrl: './carrito.css',
})
export class Carrito implements OnInit {
  productos: CartItem[] = [];
  generandoPedido = false;
  mensajePedido = '';
  errorPedido = '';

  constructor(
    private cartService: CartService,
    private ordersService: OrdersService,
    private auth: Perfiles,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cartService.items$.subscribe((items) => {
      this.productos = items;
      this.cd.detectChanges();
    });
  }

  get total() {
    return this.productos.reduce(
      (sum, producto) => sum + Number(producto.precio) * producto.cantidad,
      0
    );
  }

  eliminarDelCarrito(productoId: string) {
    this.cartService.removeItem(productoId);
  }

  actualizarCantidad(productoId: string, event: Event) {
    const select = event.target as HTMLSelectElement;
    this.cartService.updateQuantity(productoId, Number(select.value));
  }

  generarPedido() {
    if (!this.productos.length || this.generandoPedido) {
      return;
    }

    const user = this.auth.getUser();
    this.generandoPedido = true;
    this.mensajePedido = '';
    this.errorPedido = '';

    const pedido = {
      clienteId: user?.telefono || 'CLI-LOCAL',
      cliente: user?.nombre || 'Usuario Cliente',
      productos: this.getProductosPedido(),
      total: this.total
    };

    this.ordersService.createOrder(pedido).subscribe({
      next: (response) => {
        this.generandoPedido = false;
        this.mensajePedido = `Pedido ${response?.order?.folio || ''} generado correctamente.`;
        this.cartService.clear();
        this.cd.detectChanges();
      },
      error: (error) => {
        this.generandoPedido = false;
        this.errorPedido = error?.error?.message || 'No fue posible generar el pedido.';
        this.cd.detectChanges();
      }
    });
  }

  private getProductosPedido() {
    return this.productos
      .filter((producto) => Boolean(producto.productoId))
      .map((producto) => ({
        productoId: producto.productoId,
        nombre: producto.nombre,
        precio: Number(producto.precio),
        cantidad: producto.cantidad,
        subtotal: Number(producto.precio) * producto.cantidad
      }));
  }
}
