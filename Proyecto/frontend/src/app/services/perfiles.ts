import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Perfiles {

  private roleKey = 'user_role';
  private userKey = 'user_data';

  private roleSubject!: BehaviorSubject<'admin' | 'logged' | 'guest'>;
  role$;

  // 👇 Usuarios de prueba
  private users = [
    {
      telefono: '7718670260',
      password: 'eevooi',
      role: 'admin',
      nombre: 'Administrador',
      foto: 'admin.jpg'
    },
    {
      telefono: '7717717711',
      password: 'bloodrous',
      role: 'logged',
      nombre: 'Usuario Cliente',
      foto: 'user.jpg'
    }
  ];

  constructor() {
    const role = this.safeGetRole();
    this.roleSubject = new BehaviorSubject(role);
    this.role$ = this.roleSubject.asObservable();
  }

  private safeGetRole(): 'admin' | 'logged' | 'guest' {
    if (typeof window !== 'undefined' && localStorage) {
      return (localStorage.getItem(this.roleKey) as any) || 'guest';
    }
    return 'guest';
  }

  getRole(): 'admin' | 'logged' | 'guest' {
    return this.safeGetRole();
  }

  login(telefono: string, password: string): boolean {

    // 🔥 Protección SSR
    if (typeof window === 'undefined') {
      return false;
    }

    const user = this.users.find(
      u => u.telefono === telefono && u.password === password
    );

    if (user) {
      localStorage.setItem(this.roleKey, user.role);
      localStorage.setItem(this.userKey, JSON.stringify(user));
      this.roleSubject.next(user.role as any);
      return true;
    }

    return false;
  }

  logout(): void {

    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.roleKey);
      localStorage.removeItem(this.userKey);
    }

    this.roleSubject.next('guest');
  }

  // 👇 Método seguro para SSR
  getUser() {

    if (typeof window !== 'undefined' && localStorage) {
      const data = localStorage.getItem(this.userKey);
      return data ? JSON.parse(data) : null;
    }

    return null;
  }
}