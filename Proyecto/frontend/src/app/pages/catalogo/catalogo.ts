import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart.service';
import { ProductCatalogService } from '../../services/product-catalog.service';

@Component({
  selector: 'app-catalogo',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.css',
})
export class Catalogo {
  readonly productos: Product[];
  readonly categorias = [
    { key: 'oro', label: 'Oro' },
    { key: 'plata', label: 'Plata' },
    { key: 'extra', label: 'Diversos' }
  ] as const;
  filtros: Record<string, boolean> = {
    oro: true,
    plata: true,
    extra: true
  };
  mensaje = '';

  constructor(
    private readonly cartService: CartService,
    private readonly productCatalogService: ProductCatalogService
  ) {
    this.productos = this.productCatalogService.getAllProducts();
  }

  get productosFiltrados(): Product[] {
    return this.productos.filter((producto) => this.filtros[producto.categoria]);
  }

  agregarAlCarrito(producto: Product) {
    this.cartService.addItem({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      cantidad: 1,
      imagen: producto.imagen
    });

    this.mensaje = `${producto.nombre} fue agregado al carrito.`;
  }
}
