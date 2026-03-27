import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from "./components/footer/footer";
import { Navbar } from "./components/navbar/navbar";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private readonly themeKey = 'app_theme';
  protected readonly title = signal('frontend');

  constructor() {
    if (typeof window === 'undefined') {
      return;
    }

    this.applySavedTheme();
    window.addEventListener('storage', this.handleStorageThemeChange);
    window.addEventListener('app-theme-change', this.handleCustomThemeChange as EventListener);
  }

  private applySavedTheme() {
    const savedTheme = localStorage.getItem(this.themeKey) === 'dark' ? 'dark' : 'light';
    this.applyTheme(savedTheme);
  }

  private applyTheme(theme: 'light' | 'dark') {
    document.body.classList.toggle('dark-mode', theme === 'dark');
  }

  private handleStorageThemeChange = (event: StorageEvent) => {
    if (event.key !== this.themeKey) {
      return;
    }

    this.applyTheme(event.newValue === 'dark' ? 'dark' : 'light');
  };

  private handleCustomThemeChange = (event: CustomEvent<{ theme?: 'light' | 'dark' }>) => {
    this.applyTheme(event.detail?.theme === 'dark' ? 'dark' : 'light');
  };
}
