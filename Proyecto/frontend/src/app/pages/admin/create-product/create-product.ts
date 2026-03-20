import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';

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
    precio: '',
    categoria: '',
    accesorio: '',
    existencias: ''
  };

  guardarProducto(form: NgForm){
    if(form.valid){

      console.log("Producto enviado al backend:", this.producto);

      alert("Producto registrado correctamente");

      form.reset();
    }
  }
}
