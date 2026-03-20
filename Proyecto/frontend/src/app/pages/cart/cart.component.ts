import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  items: any[] = [];

  // 👇 productos disponibles (puedes cambiarlos luego)
  productosDisponibles = [
    {
      id: '1',
      nombre: 'Anillo Diamante',
      precio: 5000,
      categoria: 'Oro',
      imagen: 'https://via.placeholder.com/300'
    },
    {
      id: '2',
      nombre: 'Collar Elegante',
      precio: 3500,
      categoria: 'Plata',
      imagen: 'https://via.placeholder.com/300'
    },
    {
      id: '3',
      nombre: 'Pulsera Premium',
      precio: 2500,
      categoria: 'Extra',
      imagen: 'https://via.placeholder.com/300'
    }
  ];

  // 👇 para cambiar productos
  reemplazos: { [key: string]: string } = {};

  constructor(
    private cartService: CartService,
    private router: Router
  ) {
    this.load();
  }

  load() {
    this.items = this.cartService.getItems();
  }

  // ✅ AGREGAR PRODUCTO
  agregarAlCarrito(producto: any) {
    this.cartService.addItem({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      cantidad: 1,
      imagen: producto.imagen
    });
    this.load();
  }

  // ✅ ELIMINAR
  eliminar(id: string) {
    this.cartService.removeItem(id);
    this.load();
  }

  // ✅ CAMBIAR CANTIDAD
  cambiarCantidad(id: string, cantidad: number) {
    this.cartService.updateCantidad(id, Number(cantidad));
    this.load();
  }

  // ✅ CAMBIAR PRODUCTO
  cambiarProducto(id: string) {
    const nuevoId = this.reemplazos[id];

    if (!nuevoId || nuevoId === id) return;

    const nuevoProducto = this.productosDisponibles.find(p => p.id === nuevoId);

    if (!nuevoProducto) return;

    this.cartService.removeItem(id);

    this.cartService.addItem({
      id: nuevoProducto.id,
      nombre: nuevoProducto.nombre,
      precio: nuevoProducto.precio,
      cantidad: 1,
      imagen: nuevoProducto.imagen
    });

    this.load();
  }

  // ✅ TOTAL
  total() {
    return this.cartService.getTotal();
  }

  // ✅ IR A CHECKOUT
  irPago() {
    this.router.navigate(['/checkout']);
  }
}