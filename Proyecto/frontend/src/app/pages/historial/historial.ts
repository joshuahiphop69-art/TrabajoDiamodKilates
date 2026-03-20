import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-historial',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './historial.html'
})
export class HistorialComponent {

  orders: any[] = [];

  constructor(private orderService: OrderService) {
    this.orders = this.orderService.getOrders();
  }
}