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
  readonly materialOptions = ['Oro', 'Plata', 'Otros'];
  readonly categoriaOptions = [
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
  readonly etiq3Options = ['Dama', 'Caballero', 'Unisex', 'Niños'];
  readonly etiq4Options = [
    'Rojo',
    'Azul',
    'Rosa',
    'Plateado',
    'Dorado',
    'Púrpura',
    'Blanco',
    'Negro',
    'Verde',
    'Otro'
  ];

  private _producto: any = null;

  @Output() guardarCambios = new EventEmitter<any>();
  @Output() cerrarModal = new EventEmitter<void>();

  @Input()
  set producto(value: any) {
    this._producto = value ? this.normalizarProducto(value) : null;
  }

  get producto() {
    return this._producto;
  }

  guardar() {
    if (!this.producto) {
      return;
    }

    this.guardarCambios.emit(this.prepararPayload());
  }

  cerrar() {
    this.cerrarModal.emit();
  }

  private normalizarProducto(producto: any) {
    return {
      ...producto,
      stock: producto.stock ?? producto.existencias ?? 0,
      etiq_1: this.parseEtiqueta1(producto.etiq_1),
      etiq_2: this.parseEtiqueta2(producto.etiq_2)
    };
  }

  private prepararPayload() {
    const sizeValue = Number(this.producto.etiq_1);
    const kilaValue = Number(this.producto.etiq_2);

    return {
      ...this.producto,
      etiq_1: sizeValue === 0 ? 'Size=Ajustable' : `Size=${sizeValue}`,
      etiq_2: kilaValue === 0 ? 'Pure=925' : `Kila=${kilaValue}`,
      precio: Number(this.producto.precio),
      stock: Number(this.producto.stock)
    };
  }

  private parseEtiqueta1(value: string) {
    if (!value) {
      return '';
    }

    if (value === 'Size=Ajustable') {
      return '0';
    }

    const match = value.match(/Size=(\d+)/);
    return match ? match[1] : value;
  }

  private parseEtiqueta2(value: string) {
    if (!value) {
      return '';
    }

    if (value === 'Pure=925') {
      return '0';
    }

    const match = value.match(/Kila=(\d+)/);
    return match ? match[1] : value;
  }
}
