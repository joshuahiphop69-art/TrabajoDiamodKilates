export interface Product {
  id: string;
  nombre: string;
  precio: number;
  imagen: string;
  categoria: 'oro' | 'plata' | 'extra';
  detalles: string[];
}
