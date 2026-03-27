import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Perfiles } from '../../../services/perfiles';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class ProfileComponent {
  private readonly themeKey = 'app_theme';
  readonly fallbackAvatar = 'images/eevee.jpg';

  nombreUsuario = '';
  fotoUsuario = this.fallbackAvatar;
  menuAbierto = false;
  mostrarPerfil = false;
  temaOscuro = false;

  constructor(
    private auth: Perfiles,
    private router: Router,
    private elementRef: ElementRef<HTMLElement>
  ) {
    this.auth.role$.subscribe(() => {
      this.loadUser();
    });

    this.loadUser();
    this.initTheme();
  }

  private loadUser() {
    const user = this.auth.getUser();

    if (user) {
      this.nombreUsuario = user.nombre || 'Usuario';
      this.fotoUsuario = user.foto ? `images/${user.foto}` : this.fallbackAvatar;
      return;
    }

    this.nombreUsuario = '';
    this.fotoUsuario = this.fallbackAvatar;
    this.closeMenu();
  }

  private initTheme() {
    if (typeof window === 'undefined') {
      return;
    }

    this.temaOscuro = localStorage.getItem(this.themeKey) === 'dark';
    document.body.classList.toggle('dark-mode', this.temaOscuro);
  }

  @HostListener('window:toggle-profile-menu')
  onToggleProfileMenu() {
    if (!this.nombreUsuario) {
      return;
    }

    this.menuAbierto = !this.menuAbierto;

    if (!this.menuAbierto) {
      this.mostrarPerfil = false;
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.menuAbierto) {
      return;
    }

    const target = event.target as Node | null;

    if (target && !this.elementRef.nativeElement.contains(target)) {
      this.closeMenu();
    }
  }

  @HostListener('document:keydown.escape')
  onEscape() {
    this.closeMenu();
  }

  toggleProfileSection(event: MouseEvent) {
    event.stopPropagation();
    this.mostrarPerfil = !this.mostrarPerfil;
  }

  toggleDarkMode(event?: MouseEvent) {
    event?.stopPropagation();

    this.temaOscuro = !this.temaOscuro;
    const theme = this.temaOscuro ? 'dark' : 'light';

    document.body.classList.toggle('dark-mode', this.temaOscuro);

    if (typeof window !== 'undefined') {
      localStorage.setItem(this.themeKey, theme);
      window.dispatchEvent(new CustomEvent('app-theme-change', { detail: { theme } }));
    }
  }

  onAvatarError(event: Event) {
    const target = event.target as HTMLImageElement | null;

    if (!target || target.src.includes(this.fallbackAvatar)) {
      return;
    }

    target.src = this.fallbackAvatar;
  }

  logout() {
    this.closeMenu();
    this.auth.logout();

    setTimeout(() => {
      this.router.navigate(['/']);
    }, 150);
  }

  closeMenu() {
    this.menuAbierto = false;
    this.mostrarPerfil = false;
  }
}
