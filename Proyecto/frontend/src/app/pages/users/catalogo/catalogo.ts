import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { prod } from '../../../services/product';

type ProductoCatalogo = {
  _id: string;
  nombre: string;
  precio: number;
  stock?: number;
  existencias?: number;
  categoria?: string;
  etiq_2?: string;
  img_1?: string;
  img_2?: string;
  img_3?: string;
  img_4?: string;
};

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.css',
})
export class Catalogo implements OnInit {
  readonly filtros = [
    'Anillo',
    'Collar',
    'Aretes',
    'Broche',
    'Pulsera',
    'Brazalete',
    'Pendiente',
    'Colgante',
    'Tobillera',
    'Tiara',
    'Corona'
  ];

  productos: ProductoCatalogo[] = [];
  productosFiltrados: ProductoCatalogo[] = [];
  filtrosSeleccionados: Record<string, boolean> = {};
  cargando = false;
  error = '';

  constructor(private prodService: prod) {
    this.filtros.forEach((filtro) => {
      this.filtrosSeleccionados[filtro] = false;
    });
  }

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos() {
    this.cargando = true;
    this.error = '';

    this.prodService.getprods().subscribe({
      next: (data) => {
        this.productos = data;
        this.productosFiltrados = data;
        this.cargando = false;
      },
      error: () => {
        this.error = 'No fue posible cargar el catálogo.';
        this.cargando = false;
      }
    });
  }

  aplicarFiltros() {
    const filtrosActivos = Object.entries(this.filtrosSeleccionados)
      .filter(([, selected]) => selected)
      .map(([filtro]) => filtro);

    if (!filtrosActivos.length) {
      this.productosFiltrados = [...this.productos];
      return;
    }

    this.productosFiltrados = this.productos.filter((producto) =>
      filtrosActivos.some((filtro) =>
        producto.etiq_2 === filtro || producto.categoria === filtro
      )
    );
  }

  getImagenProducto(producto: ProductoCatalogo) {
    const ruta = producto.img_1;

    if (!ruta) {
      return 'images/diamantes.jpg';
    }

    return ruta.startsWith('/') ? ruta : `/${ruta}`;
  }

  getStock(producto: ProductoCatalogo) {
    return producto.stock ?? producto.existencias ?? 0;
  }
}
