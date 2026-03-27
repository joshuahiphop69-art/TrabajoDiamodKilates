import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { prod } from '../../../services/product';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.css',
})
export class Catalogo implements OnInit {

  productos: any[] = [];

  constructor(private prodService: prod) {}

  ngOnInit(): void {
    this.prodService.getprods().subscribe(data => {
      this.productos = data;
    });
  }
}