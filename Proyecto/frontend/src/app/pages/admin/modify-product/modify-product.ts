import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modify-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modify-product.html',
  styleUrl: './modify-product.css'
})
export class ModifyProduct {
  @Input() producto: any = null;
  @Output() guardarCambios = new EventEmitter<any>();
  @Output() cerrarModal = new EventEmitter<void>();

  guardar() {
    this.guardarCambios.emit(this.producto);
  }

  cerrar() {
    this.cerrarModal.emit();
  }
}
