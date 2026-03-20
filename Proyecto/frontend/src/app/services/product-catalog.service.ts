import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductCatalogService {
  private readonly products: Product[] = [
    {
      id: 'oro-anillo-grabado',
      nombre: 'Anillo con Grabado y Patron de Diseno',
      precio: 2200,
      imagen: 'images/oro1.jpg',
      categoria: 'oro',
      detalles: ['Diamantes incrustados', 'Grabado a eleccion del cliente', 'Oro de 18 kilates']
    },
    {
      id: 'oro-laton-diamante',
      nombre: 'Anillo con Diamante y Laton',
      precio: 1000,
      imagen: 'images/oro2.jpg',
      categoria: 'oro',
      detalles: ['Diamante incrustado', 'Grabado de pareja o destinatario', 'Oro de 6 kilates con laton']
    },
    {
      id: 'oro-matrimonio',
      nombre: 'Anillos de Oro para Matrimonio',
      precio: 3000,
      imagen: 'images/oro3.jpg',
      categoria: 'oro',
      detalles: ['Diamante incrustado de 4 mm', 'Incluye empaque especial', 'Oro de 12 kilates']
    },
    {
      id: 'oro-pulsera-minimalista',
      nombre: 'Pulsera Minimalista de Oro',
      precio: 900,
      imagen: 'images/oro4.jpg',
      categoria: 'oro',
      detalles: ['Cadena a medida del cliente', 'Oro de 6 kilates', 'Set de regalo personalizado']
    },
    {
      id: 'plata-broches',
      nombre: 'Broches para Saco de Plata',
      precio: 1200,
      imagen: 'images/plata1.jpg',
      categoria: 'plata',
      detalles: ['Disenos variados', 'Eleccion del usuario', 'Plata fina sin laton']
    },
    {
      id: 'plata-anillos-juego',
      nombre: 'Anillos de Compromiso a Juego',
      precio: 1000,
      imagen: 'images/plata2.png',
      categoria: 'plata',
      detalles: ['Diamante incrustado', 'Juego para pareja', 'Grabado personalizado con costo adicional']
    },
    {
      id: 'plata-diamante-base',
      nombre: 'Anillos de Diamante en Base de Plata',
      precio: 3000,
      imagen: 'images/plata3.jpg',
      categoria: 'plata',
      detalles: ['Diamante incrustado de 4 mm', 'Molde a eleccion del cliente', 'Incluye empaque personalizado']
    },
    {
      id: 'extra-diamante-flor',
      nombre: 'Anillo Diamante con Acabado Floral',
      precio: 7200,
      imagen: 'images/diamante1.jpg',
      categoria: 'extra',
      detalles: ['Diamantes incrustados', 'Diamante de alto calibre', 'Revestimiento de plata pura']
    },
    {
      id: 'extra-pulsera-rubies',
      nombre: 'Pulsera de Rubies con Oro y Plata',
      precio: 4000,
      imagen: 'images/ruby.jpg',
      categoria: 'extra',
      detalles: ['Plata banada con laton', 'Oro de 6 kilates', 'Diametro de 3 cm']
    },
    {
      id: 'extra-silver-rubies',
      nombre: 'Pulsera Silver Rubies',
      precio: 2000,
      imagen: 'images/ruby1.jpg',
      categoria: 'extra',
      detalles: ['Incrustaciones de ruby', 'Posible pedido a gusto del cliente', 'Plata con laton']
    },
    {
      id: 'extra-anillo-ruby',
      nombre: 'Anillo de Oro y Ruby',
      precio: 2000,
      imagen: 'images/ruby2.jpg',
      categoria: 'extra',
      detalles: ['Ruby incrustado', 'Oro de 12 kilates', 'Incrustaciones decorativas']
    },
    {
      id: 'extra-collar-diamantes',
      nombre: 'Collar de Diamantes Relucientes',
      precio: 12000,
      imagen: 'images/diamantes.jpg',
      categoria: 'extra',
      detalles: ['Diamantes de alto calibre', 'Base de oro y laton de 18 kilates', 'Incluye set de regalo']
    }
  ];

  getAllProducts(): Product[] {
    return this.products.map((product) => ({ ...product, detalles: [...product.detalles] }));
  }

  getProductsByCategory(category: Product['categoria']): Product[] {
    return this.getAllProducts().filter((product) => product.categoria === category);
  }

  getProductById(id: string): Product | undefined {
    return this.getAllProducts().find((product) => product.id === id);
  }
}
