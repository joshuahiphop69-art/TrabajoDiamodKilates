import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './sign-up.html',
  styleUrls: ['./sign-up.css']
})
export class SignUp {
  
  usuario: string = '';
  telefono: string = '';
  password: string = '';
  confirmPassword: string = '';

  registrar(form: NgForm) {

    if (this.password !== this.confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    if (form.valid) {

      const datosUsuario = {
        usuario: this.usuario,
        telefono: this.telefono,
        password: this.password
      };

      console.log("Usuario registrado:", datosUsuario);

      alert("Registro exitoso");

      form.reset();
    }
  }
}
