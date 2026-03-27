import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { prod } from '../../../services/product';

@Component({
  selector: 'app-prod-oro', 
  standalone: true,
  imports: [CommonModule],
  templateUrl: './prod-oro.html', 
  styleUrl: './prod-oro.css',     
})
export class ProdOro implements OnInit {

  productos: any[] = []; 

  constructor(private prodService: prod) {}

  ngOnInit(): void {
    this.prodService.getprods().subscribe({
      next: (data) => {
        this.productos = data.filter(p => p.categoria === 'Oro'); 
      },
      error: (err) => console.error(err)
    });
  }
}