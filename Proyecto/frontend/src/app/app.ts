import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./components/header/header";
import { Footer } from "./components/footer/footer";
import { Navbar } from "./components/navbar/navbar";
import { Profile } from "./pages/logged/profile/profile";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Navbar, Footer, Profile],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend');
}
