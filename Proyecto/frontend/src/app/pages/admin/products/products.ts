import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { prod } from '../../../services/product';
import { ModifyProduct } from '../modify-product/modify-product';

@Component({
  selector: 'app-listado',
  standalone: true,
  imports: [CommonModule, ModifyProduct],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products implements OnInit {
  prods: any[] = [];
  productoEnEdicion: any = null;
  guardandoCambios = false;

  constructor(
    private prodService: prod,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadprods();
  }

  loadprods() {
    this.prodService.getprods().subscribe({
      next: (data) => {
        this.prods = data;
        this.cd.detectChanges();
      },
      error: (error) => {
        console.error('Error al obtener productos:', error);
      }
    });
  }

  deleteprod(id: string) {
    if (confirm('¿Seguro que deseas eliminar este producto?')) {
      this.prodService.deleteprod(id).subscribe({
        next: () => {
          this.prods = this.prods.filter((p) => p._id !== id);
          this.cd.detectChanges();
        },
        error: (error) => {
          console.error('Error al eliminar:', error);
        }
      });
    }
  }

  editprod(prodActual: any) {
    this.productoEnEdicion = { ...prodActual };
  }

  cerrarModalEdicion() {
    this.productoEnEdicion = null;
  }

  guardarCambios(prodActualizado: any) {
    if (!prodActualizado?._id || this.guardandoCambios) {
      return;
    }

    this.guardandoCambios = true;

    this.prodService.updateprod(prodActualizado._id, prodActualizado).subscribe({
      next: () => {
        this.prods = this.prods.map((prodItem) =>
          prodItem._id === prodActualizado._id ? { ...prodActualizado } : prodItem
        );
        this.guardandoCambios = false;
        this.cerrarModalEdicion();
        this.cd.detectChanges();
      },
      error: (error) => {
        this.guardandoCambios = false;
        console.error('Error al actualizar producto:', error);
      }
    });
  }
}
