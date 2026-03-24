import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { prod } from '../../../services/product';
import { ModifyProduct } from '../modify-product/modify-product';

@Component({
  selector: 'app-listado',
  standalone: true,
  imports: [CommonModule, RouterLink, ModifyProduct],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products implements OnInit {
  prods: any[] = [];
  productoEnEdicion: any = null;
  guardandoCambios = false;
  mostrarModalEliminar = false;
  productoAEliminar: string | null = null;

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
    this.productoAEliminar = id;
    this.mostrarModalEliminar = true;
  }

  cerrarModalEliminar() {
    this.productoAEliminar = null;
    this.mostrarModalEliminar = false;
  }

  confirmarEliminacion() {
    if (!this.productoAEliminar) {
      return;
    }

    this.prodService.deleteprod(this.productoAEliminar).subscribe({
      next: () => {
        this.cerrarModalEliminar();
        window.location.reload();
      },
      error: (error) => {
        console.error('Error al eliminar:', error);
        this.cerrarModalEliminar();
      }
    });
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
