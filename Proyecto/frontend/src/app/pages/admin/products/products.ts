import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModifyProduct } from '../modify-product/modify-product'

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ModifyProduct, CommonModule],
  templateUrl: './products.html',
  styleUrls: ['./products.css']
})
export class Products {

  productos = [
    { nombre: "Anillo Diamante", precio: 5200, categoria: "Oro", accesorio: "Anillo", existencias: 5 },
    { nombre: "Pulsera Elegance", precio: 1800, categoria: "Plata", accesorio: "Pulsera", existencias: 12 },
    { nombre: "Collar Corazón", precio: 2400, categoria: "Oro", accesorio: "Collar", existencias: 7 },
    { nombre: "Aretes Luna", precio: 950, categoria: "Plata", accesorio: "Aretes", existencias: 20 },
    { nombre: "Cadena Real", precio: 3100, categoria: "Oro", accesorio: "Cadena", existencias: 6 },
    { nombre: "Pulsera Perlas", precio: 1450, categoria: "Otros", accesorio: "Pulsera", existencias: 10 },
    { nombre: "Anillo Promesa", precio: 2700, categoria: "Oro", accesorio: "Anillo", existencias: 8 },
    { nombre: "Collar Estrella", precio: 1650, categoria: "Plata", accesorio: "Collar", existencias: 9 },
    { nombre: "Aretes Cristal", precio: 850, categoria: "Otros", accesorio: "Aretes", existencias: 15 },
    { nombre: "Cadena Clásica", precio: 2200, categoria: "Oro", accesorio: "Cadena", existencias: 11 }
  ];

  productoSeleccionado: any = {};

  eliminarProducto(index: number) {
    if (confirm("¿Seguro que deseas eliminar este producto?")) {
      this.productos.splice(index, 1);
    }
  }

  abrirEdicion(producto: any) {
    this.productoSeleccionado = { ...producto };
  }

  guardarCambios(productoEditado: any) {

    const index = this.productos.findIndex(p => p.nombre === productoEditado.nombre);

    if (index !== -1) {
      this.productos[index] = productoEditado;
    }
  }
}
