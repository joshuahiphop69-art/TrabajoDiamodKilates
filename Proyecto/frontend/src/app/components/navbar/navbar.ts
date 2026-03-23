import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Perfiles } from '../../services/perfiles';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  rol: 'admin' | 'logged' | 'guest' = 'guest';

  constructor(private auth: Perfiles) {}

  ngOnInit(): void {
    this.auth.role$.subscribe(role => {
      this.rol = role;
    });
  }

  logout() {
    this.auth.logout();
    this.rol = 'guest';
  }

  openProfile(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    window.dispatchEvent(new CustomEvent('toggle-profile-menu'));
  }
}
