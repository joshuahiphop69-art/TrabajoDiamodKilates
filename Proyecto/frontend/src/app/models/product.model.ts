export interface Product {
  id: string;
  nombre: string;
  precio: number;
  categoria: string;
  imagen: string;
  detalles: string[]; // 👈 ESTA ES LA CLAVE
}