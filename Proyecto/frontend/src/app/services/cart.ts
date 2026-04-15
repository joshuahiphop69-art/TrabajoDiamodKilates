import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type CartItem = {
  productoId: string;
  id?: string;
  nombre: string;
  precio: number;
  imagen?: string;
  cantidad: number;
};

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly cartKey = 'cart_items';
  private readonly itemsSubject = new BehaviorSubject<CartItem[]>(this.readItems());
  items$ = this.itemsSubject.asObservable();

  getItems() {
    return this.itemsSubject.value;
  }

  addItem(item: Omit<CartItem, 'cantidad'>) {
    const items = this.itemsSubject.value.map((cartItem) => this.normalizeItem(cartItem));
    const productoId = item.productoId || item.id || '';

    if (!productoId) {
      return;
    }

    const existing = items.find((cartItem) => cartItem.productoId === productoId);

    if (existing) {
      existing.cantidad = Math.min(existing.cantidad + 1, 3);
    } else {
      items.push({ ...item, productoId, cantidad: 1 });
    }

    this.saveItems(items);
  }

  removeItem(productoId: string) {
    this.saveItems(this.itemsSubject.value.filter((item) => item.productoId !== productoId));
  }

  updateQuantity(productoId: string, cantidad: number) {
    const normalizedQuantity = Math.min(Math.max(Number(cantidad) || 1, 1), 3);
    const items = this.itemsSubject.value.map((item) =>
      item.productoId === productoId ? { ...item, cantidad: normalizedQuantity } : item
    );

    this.saveItems(items);
  }

  clear() {
    this.saveItems([]);
  }

  private readItems(): CartItem[] {
    if (typeof window === 'undefined') {
      return [];
    }

    const data = localStorage.getItem(this.cartKey);
    const items = data ? JSON.parse(data) : [];

    return items.map((item: CartItem) => this.normalizeItem(item));
  }

  private saveItems(items: CartItem[]) {
    const normalizedItems = items
      .map((item) => this.normalizeItem(item))
      .filter((item) => Boolean(item.productoId));

    if (typeof window !== 'undefined') {
      localStorage.setItem(this.cartKey, JSON.stringify(normalizedItems));
    }

    this.itemsSubject.next(normalizedItems);
  }

  private normalizeItem(item: CartItem): CartItem {
    return {
      ...item,
      productoId: item.productoId || item.id || '',
      cantidad: Math.min(Math.max(Number(item.cantidad) || 1, 1), 3)
    };
  }
}
