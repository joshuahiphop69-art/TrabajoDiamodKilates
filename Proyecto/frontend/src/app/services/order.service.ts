import { Injectable } from '@angular/core';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private key = 'orders';

  getOrders(): Order[] {
    return JSON.parse(localStorage.getItem(this.key) || '[]');
  }

  addOrder(order: Order) {
    const orders = this.getOrders();
    orders.push(order);
    localStorage.setItem(this.key, JSON.stringify(orders));
  }

  clearOrders() {
    localStorage.removeItem(this.key);
  }
}