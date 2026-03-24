import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from "./components/footer/footer";
import { Navbar } from "./components/navbar/navbar";
import { Profile } from "./pages/logged/profile/profile";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer, Profile],
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

    const savedTheme = localStorage.getItem(this.themeKey);
    document.body.classList.toggle('dark-mode', savedTheme === 'dark');
  }
}
