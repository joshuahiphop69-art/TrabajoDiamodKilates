import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private API = 'https://trabajodiamodkilates.onrender.com/orders';

  constructor(private http: HttpClient) {}

  getOrders(clienteId = '') {
    const url = clienteId
      ? `${this.API}?clienteId=${encodeURIComponent(clienteId)}`
      : this.API;

    return this.http.get<any[]>(url);
  }

  createOrder(order: any) {
    return this.http.post<any>(this.API, order);
  }

  updateOrderStatus(id: string, estado: string) {
    return this.http.put<any>(`${this.API}/${id}/status`, { estado });
  }
}