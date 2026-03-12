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
  rol="guest";

  constructor(private auth:Perfiles){}

  ngOnInit(){
    this.rol = this.auth.getRol();
  }
}
