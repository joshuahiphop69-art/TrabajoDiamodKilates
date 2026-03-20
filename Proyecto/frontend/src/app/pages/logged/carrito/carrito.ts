import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './carrito.html',
  styleUrl: './carrito.css',
})
export class Carrito {
  productos = [
    {
      id: 1,
      nombre: 'Anillo de diamante',
      precio: 12500,
    },
    {
      id: 2,
      nombre: 'Pulsera de oro',
      precio: 8400,
    },
    {
      id: 3,
      nombre: 'Collar de plata',
      precio: 3650,
    },
  ];

  eliminarDelCarrito(id: number) {
    this.productos = this.productos.filter((producto) => producto.id !== id);
  }
}
