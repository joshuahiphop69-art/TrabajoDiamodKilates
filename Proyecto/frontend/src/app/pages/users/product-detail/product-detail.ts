import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { prod } from '../../../services/product';

type ProductoDetalle = {
  _id: string;
  nombre: string;
  precio: number;
  material?: string;
  categoria?: string;
  stock?: number;
  existencias?: number;
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
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})
export class ProductDetail implements OnInit {
  producto: ProductoDetalle | null = null;
  imagenesProducto: string[] = ['images/diamantes.jpg'];
  etiquetasProducto: string[] = [];
  detallesProducto: string[] = [];
  stockProducto = 0;
  cargando = false;
  error = '';
  imagenActual = 0;
  private touchStartX = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private prodService: prod,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');

      if (!id) {
        this.error = 'Producto no encontrado.';
        return;
      }

      this.cargarProductoDesdeNavegacion(id);
    });
  }

  cargarProductoDesdeNavegacion(id: string) {
    const productoNavegado = this.router.getCurrentNavigation()?.extras.state?.['producto']
      ?? (typeof window !== 'undefined' ? history.state?.producto : null);

    if (productoNavegado?._id === id) {
      this.setProducto(productoNavegado);
    } else if (this.producto?._id !== id) {
      this.producto = null;
    }

    this.cargarProducto(id, this.producto?._id === id);
  }

  cargarProducto(id: string, mantenerVistaActual = false) {
    this.cargando = !mantenerVistaActual;
    this.error = '';

    this.prodService.getprod(id).subscribe({
      next: (data) => {
        this.setProducto(data);
        this.cargando = false;
        this.cd.detectChanges();
      },
      error: () => {
        if (!this.producto) {
          this.error = 'No fue posible cargar el producto.';
        }
        this.cargando = false;
        this.cd.detectChanges();
      }
    });
  }

  private setProducto(producto: ProductoDetalle) {
    this.producto = producto;
    this.imagenActual = 0;
    const rutas = [
      producto.img_1,
      producto.img_2,
      producto.img_3,
      producto.img_4
    ].filter((ruta): ruta is string => Boolean(ruta));

    this.imagenesProducto = rutas.length
      ? rutas.map((ruta) => this.normalizarImagen(ruta))
      : ['images/diamantes.jpg'];

    this.etiquetasProducto = [
      producto.material,
      producto.categoria,
      producto.etiq_1,
      producto.etiq_2,
      producto.etiq_3,
      producto.etiq_4,
      producto.etiq_5
    ].filter((etiqueta): etiqueta is string => Boolean(etiqueta));

    this.detallesProducto = [
      producto.deta_1,
      producto.deta_2,
      producto.deta_3
    ].filter((detalle): detalle is string => Boolean(detalle));

    this.stockProducto = producto.stock ?? producto.existencias ?? 0;
  }

  imagenAnterior() {
    const total = this.imagenesProducto.length;
    this.imagenActual = (this.imagenActual - 1 + total) % total;
  }

  imagenSiguiente() {
    const total = this.imagenesProducto.length;
    this.imagenActual = (this.imagenActual + 1) % total;
  }

  seleccionarImagen(index: number) {
    this.imagenActual = index;
  }

  onTouchStart(event: TouchEvent) {
    this.touchStartX = event.changedTouches[0]?.clientX ?? 0;
  }

  onTouchEnd(event: TouchEvent) {
    const touchEndX = event.changedTouches[0]?.clientX ?? 0;
    const deltaX = touchEndX - this.touchStartX;

    if (Math.abs(deltaX) < 40 || this.imagenesProducto.length <= 1) {
      return;
    }

    if (deltaX > 0) {
      this.imagenAnterior();
      return;
    }

    this.imagenSiguiente();
  }

  private normalizarImagen(ruta: string) {
    if (ruta.startsWith('/') || ruta.startsWith('http://') || ruta.startsWith('https://')) {
      return ruta;
    }

    return `/${ruta}`;
  }
}
