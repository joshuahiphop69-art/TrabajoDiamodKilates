import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { prod } from '../../../services/product';

@Component({
  selector: 'app-listado',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products implements OnInit {

  prods: any[] = [];

  constructor(private prodService: prod) {}

  ngOnInit(): void {
    this.loadprods();
  }

  loadprods() {
    this.prodService.getprods().subscribe({
      next: (data) => {
        this.prods = data;
        console.log("Productos cargados:", this.prods);
      },
      error: (error) => {
        console.error("Error al obtener productos:", error);
      }
    });
  }

  deleteprod(id: string) {
    if (confirm("¿Seguro que deseas eliminar este producto?")) {

      this.prodService.deleteprod(id).subscribe({
        next: () => {
          alert("Producto eliminado correctamente");

          // Quitamos el producto del arreglo sin recargar la página
          this.prods = this.prods.filter(p => p._id !== id);
        },
        error: (error) => {
          console.error("Error al eliminar:", error);
        }
      });
    }
  }

  editprod(prod: any) {
    console.log("Editar producto:", prod);

  }

}