import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'create-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-product.html',
  styleUrls: ['./create-product.css']
})
export class CreateProduct {

  producto = {
    nombre: '',
    precio: 0,
    categoria: '',
    accesorio: '',
    existencias: 0
  };

  // Imagen
  previewImage: string | ArrayBuffer | null = null;
  imagenFile!: File;

  seleccionarCategoria(categoria: string) {
    this.producto.categoria = categoria;
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.imagenFile = file;
      this.preview(file);
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();

    const file = event.dataTransfer?.files[0];
    if (file) {
      this.imagenFile = file;
      this.preview(file);
    }
  }

  preview(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      this.previewImage = reader.result;
    };
    reader.readAsDataURL(file);
  }

  guardarProducto(form: NgForm) {
    if (form.valid) {

      console.log("Producto enviado al backend:", this.producto);
      console.log("Imagen:", this.imagenFile);

      alert("Producto registrado correctamente");

      form.reset();
      this.previewImage = null;
    }
  }
}