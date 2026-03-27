import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class prod {

  private apiUrl = 'http://localhost:5000/productos';
  private cache: any[] = [];

  constructor(private http: HttpClient) {}

  getprods(): Observable<any[]> {
    if (this.cache.length > 0) {
      return of(this.cache);
    }

    return this.http.get<any[]>(this.apiUrl).pipe(
      tap(data => this.cache = data)
    );
  }

  deleteprod(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateprod(id: string, prod: any) {
    return this.http.put(`${this.apiUrl}/${id}`, prod);
  }
}