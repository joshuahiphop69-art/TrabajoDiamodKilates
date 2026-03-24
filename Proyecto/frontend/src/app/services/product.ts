import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class prod {
  private API = 'http://localhost:5000/list-products';
  private uploadAPI = 'http://localhost:5000/upload-product-images';

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
  uploadImages(files: File[]) {
    const formData = new FormData();

    files.forEach((file) => {
      formData.append('images', file);
    });

    return this.http.post<{ paths: string[] }>(this.uploadAPI, formData);
  }
}
