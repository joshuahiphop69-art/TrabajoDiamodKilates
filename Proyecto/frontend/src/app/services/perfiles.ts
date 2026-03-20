import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Perfiles {
  rol:string = "guest";

  loginUsuario(){
    this.rol = "logged";
  }

  loginAdmin(){
    this.rol = "admin";
  }

  logout(){
    this.rol = "guest";
  }

  getRol(){
    return this.rol;
  }
}
