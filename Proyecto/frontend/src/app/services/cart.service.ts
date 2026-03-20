import { Injectable } from '@angular/core';
import { CartItem } from '../models/cart-item.model';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private items: CartItem[] = [];

  constructor() {
    this.loadCart();
  }

  private saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.items));
  }

  private loadCart() {
    const data = localStorage.getItem('cart');
    if (data) {
      this.items = JSON.parse(data);
    }
  }

  getItems(): CartItem[] {
    return this.items;
  }

  addItem(product: CartItem) {
    const existing = this.items.find(p => p.id === product.id);

    if (existing) {
      existing.cantidad += product.cantidad;
    } else {
      this.items.push(product);
    }

    this.saveCart();
  }

  replaceItem(currentId: string, product: Product) {
    const currentItem = this.items.find((item) => item.id === currentId);

    if (!currentItem) {
      return;
    }

    const cantidadActual = currentItem.cantidad;
    this.items = this.items.filter((item) => item.id !== currentId);

    const existing = this.items.find((item) => item.id === product.id);

    if (existing) {
      existing.cantidad += cantidadActual;
    } else {
      this.items.push({
        id: product.id,
        nombre: product.nombre,
        precio: product.precio,
        cantidad: cantidadActual,
        imagen: product.imagen
      });
    }

    this.saveCart();
  }

  removeItem(id: string) {
    this.items = this.items.filter(p => p.id !== id);
    this.saveCart();
  }

  updateCantidad(id: string, cantidad: number) {
    const item = this.items.find(p => p.id === id);
    if (item) {
      item.cantidad = cantidad > 0 ? cantidad : 1;
      this.saveCart();
    }
  }

  clearCart() {
    this.items = [];
    this.saveCart();
  }

  getTotal(): number {
    return this.items.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  }
}
