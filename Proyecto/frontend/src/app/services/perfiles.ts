import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Perfiles {

  private roleKey = 'user_role';
  private roleSubject!: BehaviorSubject<'admin' | 'logged' | 'guest'>;

  role$;

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
    if (typeof window !== 'undefined') {
      // ADMIN
      if (telefono === '7718670260' && password === 'eevooi') {
        localStorage.setItem(this.roleKey, 'admin');
        this.roleSubject.next('admin');
        return true;
      }
      // USER LOGGED
      if (telefono === '7717717711' && password === 'bloodrous') {
        localStorage.setItem(this.roleKey, 'logged');
        this.roleSubject.next('logged');
        return true;
      }
    }
    return false;
  }

  logout(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.roleKey);
    }
    this.roleSubject.next('guest');
  }
}