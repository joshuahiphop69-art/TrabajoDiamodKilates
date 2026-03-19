import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  nombreUsuario = 'Eevee';
  seccion: 'datos' | 'seguridad' | null = null;

  constructor(private auth: Perfiles) {}

  setSeccion(sec: 'datos' | 'seguridad') {
    this.seccion = sec;
  }

  toggleDarkMode() {
    document.body.classList.toggle('bg-dark');
    document.body.classList.toggle('text-white');
  }

  logout() {
    this.auth.logout();

    const panel = bootstrap.Offcanvas.getInstance(
      document.getElementById('profilePanel')
    );

    panel.hide();
  }

  openPanel() {
    const panel = new bootstrap.Offcanvas(
      document.getElementById('profilePanel')
    );
    panel.show();
  }
}

