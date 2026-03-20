import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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

        // 🔥 Forzamos detección de cambios (fix hydration bug)
        this.cd.detectChanges();

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
          this.prods = this.prods.filter(p => p._id !== id);
          this.cd.detectChanges(); // 🔥 también aquí
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