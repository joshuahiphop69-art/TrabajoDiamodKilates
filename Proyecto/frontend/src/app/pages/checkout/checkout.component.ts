import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CartItem } from '../../models/cart-item.model';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './checkout.component.html'
})
export class CheckoutComponent {
  metodoPago: string = 'tarjeta';
  items: CartItem[] = [];
  pedidoConfirmado = false;
  pedidoGenerado: {
    items: CartItem[];
    total: number;
    metodoPago: string;
    fecha: Date;
  } | null = null;

  constructor(
    private readonly cartService: CartService,
    private readonly router: Router,
    private orderService: OrderService
  ) {
    this.items = [...this.cartService.getItems()];
  }

  confirmarPago() {
    if (this.items.length === 0) {
      return;
    }

    this.pedidoGenerado = {
      items: [...this.items],
      total: this.cartService.getTotal(),
      metodoPago: this.metodoPago,
      fecha: new Date()
    };

    console.log('Pedido enviado:', this.pedidoGenerado);

    // ✅ NUEVO: guardar en historial
    const order = {
      id: Date.now().toString(),
      fecha: new Date().toLocaleString(),
      items: this.items,
      total: this.cartService.getTotal()
    };

    this.orderService.addOrder(order);

    // Aquí luego conectamos con backend
    this.cartService.clearCart();

    this.items = [];
    this.pedidoConfirmado = true;
  }

  total() {
    return this.cartService.getTotal();
  }

  volverAlCarrito() {
    this.router.navigate(['/compras-pedidos']);
  }
}