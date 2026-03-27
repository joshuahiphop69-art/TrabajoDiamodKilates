import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { prod } from '../../../services/product';

@Component({
  selector: 'app-prod-plata',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './prod-plata.html',
  styleUrl: './prod-plata.css',
})
export class ProdPlata implements OnInit {

  productos: any[] = []; // 👈 nombre igual que en HTML

  constructor(private prodService: prod) {}

  ngOnInit(): void {
    this.prodService.getprods().subscribe({
      next: (data) => {
        this.productos = data.filter(p => p.categoria === 'Plata'); // 👈 usa categoria
      },
      error: (err) => console.error(err)
    });
  }
}