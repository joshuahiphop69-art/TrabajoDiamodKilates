import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../../models/product.model';
import { CartService } from '../../../services/cart.service';
import { ProductCatalogService } from '../../../services/product-catalog.service';

@Component({
  selector: 'app-prod-oro',
  imports: [CommonModule, RouterLink],
  templateUrl: './prod-oro.html',
  styleUrl: './prod-oro.css',
})
export class ProdOro {
  readonly productos: Product[];
  mensaje = '';

  constructor(
    private readonly cartService: CartService,
    private readonly productCatalogService: ProductCatalogService
  ) {
    this.productos = this.productCatalogService.getProductsByCategory('oro');
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
