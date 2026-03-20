import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Perfiles } from '../../../services/perfiles';

declare var bootstrap: any;

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {

  nombreUsuario = '';
  fotoUsuario = '';
  seccion: 'datos' | 'seguridad' | null = null;

  constructor(
    private auth: Perfiles,
    private router: Router
  ) {

    // 🔥 Se actualiza automáticamente cuando cambia login/logout
    this.auth.role$.subscribe(() => {
      this.loadUser();
    });

    // 🔥 Carga inicial
    this.loadUser();
  }

  private loadUser() {
    const user = this.auth.getUser();

    if (user) {
      this.nombreUsuario = user.nombre;
      this.fotoUsuario = user.foto;
    } else {
      this.nombreUsuario = '';
      this.fotoUsuario = '';
    }
  }

  setSeccion(sec: 'datos' | 'seguridad') {
    this.seccion = sec;
  }

  toggleDarkMode() {
    document.body.classList.toggle('bg-dark');
    document.body.classList.toggle('text-white');
  }

  logout() {

    const panel = bootstrap.Offcanvas.getInstance(
      document.getElementById('profilePanel')
    );

    if (panel) {
      panel.hide();
    }

    this.auth.logout();

    // 🔥 Espera que cierre animación y navega
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 200);
  }

  openPanel() {
    const panel = new bootstrap.Offcanvas(
      document.getElementById('profilePanel')
    );
    panel.show();
  }
}