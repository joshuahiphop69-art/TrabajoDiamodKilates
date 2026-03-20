import { Injectable } from '@angular/core';
import { HttpClient, withFetch } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class prod {
  private API = 'http://localhost:5000/list-products'

  constructor(private http: HttpClient) {}

  getprods() {
    return this.http.get<any[]>(this.API);
  }
  createprod(prod: any) {
    return this.http.post(this.API, prod);
  }
  updateprod(id: string, prod: any) {
    return this.http.put(`${this.API}/${id}`, prod);
  }
  deleteprod(id: string) {
    return this.http.delete(`${this.API}/${id}`);
  }
}
