import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./components/header/header";
import { Footer } from "./components/footer/footer";
import { Navbar } from "./components/navbar/navbar";
import { NavbarGuest } from "./components/navbar-guest/navbar-guest";
import { NavbarUser } from "./components/navbar-user/navbar-user";
import { NavbarAdmin } from "./components/navbar-admin/navbar-admin";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Navbar, NavbarGuest, NavbarAdmin, NavbarUser, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend');
}
