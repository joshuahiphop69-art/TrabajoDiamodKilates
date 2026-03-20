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

  constructor(private auth: Perfiles, private router: Router) {}

  processForm(form: NgForm) {
    if (form.invalid) {
      this.tituloModal = 'Error';
      this.mensajeModal = 'Completa correctamente los campos';
    }

    const telefono = form.value.telefono;
    const password = form.value.password;

    console.log("Telefono:", telefono);
    console.log("Password:", password);

    const success = this.auth.login(telefono, password);

    if (success) {
      // Redirigir después de 1 segundo
      setTimeout(() => {
        this.router.navigate(['/']);
      }, 1000);

    } else {
      this.tituloModal = 'Error';
      this.mensajeModal = 'Credenciales incorrectas';

      this.showModal();
    }
  }

  showModal() {
    const modal = new bootstrap.Modal(document.getElementById('modalResult'));
    modal.show();
  }
}
