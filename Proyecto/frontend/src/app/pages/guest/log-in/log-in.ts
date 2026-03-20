import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { Perfiles } from '../../../services/perfiles'
declare var bootstrap: any;

@Component({
  selector: 'app-home',
  imports: [FormsModule, CommonModule],
  templateUrl: './log-in.html',
  styleUrl: './log-in.css',
})
export class LogIn {
  tituloModal = '';
  mensajeModal = '';

  processForm(form: NgForm) {
    if (form.invalid) {
      this.tituloModal = 'Error';
      this.mensajeModal = 'Completa correctamente los campos';
    } else {
      this.tituloModal = 'Éxito';
      this.mensajeModal = 'Inicio de sesión exitoso';
      form.resetForm();
    }

    const modal = document.getElementById('modalResult');
    if (modal) {
      new bootstrap.Modal(modal).show();
    }
  }

  constructor(private auth:Perfiles, private router:Router){}

  login(tipo:string){
    if(tipo === "admin"){
      this.auth.loginAdmin();
      this.router.navigate(['/admin']);
    }
    if(tipo === "user"){
      this.auth.loginUsuario();
      this.router.navigate(['/usuario']);
    }
  }
}
