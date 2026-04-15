import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { prod } from '../../../services/product';

type ProductoCatalogo = {
  _id: string;
  nombre: string;
  precio: number;
  material?: string;
  stock?: number;
  existencias?: number;
  categoria?: string;
  etiq_1?: string;
  etiq_2?: string;
  etiq_3?: string;
  etiq_4?: string;
  etiq_5?: string;
  deta_1?: string;
  deta_2?: string;
  deta_3?: string;
  img_1?: string;
  img_2?: string;
  img_3?: string;
  img_4?: string;
};

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
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

  constructor(
    private prodService: prod,
    private cd: ChangeDetectorRef
  ) {
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
        this.productosFiltrados = [...data];
        this.cargando = false;
        this.cd.detectChanges();
      },
      error: () => {
        this.error = 'No fue posible cargar el catálogo.';
        this.cargando = false;
        this.cd.detectChanges();
      }
    });
  }

  aplicarFiltros() {
    const filtrosActivos = Object.entries(this.filtrosSeleccionados)
      .filter(([, selected]) => selected)
      .map(([filtro]) => filtro);

    if (!filtrosActivos.length) {
      this.productosFiltrados = [...this.productos];
      this.cd.detectChanges();
      return;
    }

    this.productosFiltrados = this.productos.filter((producto) =>
      filtrosActivos.some((filtro) =>
        producto.etiq_2 === filtro || producto.categoria === filtro
      )
    );
    this.cd.detectChanges();
  }

  getImagenProducto(producto: ProductoCatalogo) {
    const ruta = producto.img_1 || producto.img_2 || producto.img_3 || producto.img_4;

    if (!ruta) {
      return 'images/diamantes.jpg';
    }

    if (ruta.startsWith('/') || ruta.startsWith('http://') || ruta.startsWith('https://')) {
      return ruta;
    }

    return `/${ruta}`;
  }

  getStock(producto: ProductoCatalogo) {
    return producto.stock ?? producto.existencias ?? 0;
  }
}
