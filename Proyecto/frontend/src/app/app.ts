import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./components/header/header";
import { Footer } from "./components/footer/footer";
<<<<<<< Updated upstream
import { NavbarGuest } from "./components/navbar-guest/navbar-guest";
import { NavbarUser } from "./components/navbar-user/navbar-user";
import { NavbarAdmin } from "./components/navbar-admin/navbar-admin";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, NavbarGuest, NavbarAdmin, NavbarUser, Footer],
=======
import { Navbar } from "./components/navbar/navbar";
import { Profile } from "./pages/logged/profile/profile";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Navbar, Footer, Profile],
>>>>>>> Stashed changes
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend');
}
