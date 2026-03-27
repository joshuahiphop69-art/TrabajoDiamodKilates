import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { prod } from '../../../services/product';

type VistaPreviaImagen = {
  file: File;
  previewUrl: string;
};

type ProductoForm = {
  nombre: string;
  material: string;
  categoria: string;
  etiq_1: string;
  etiq_2: string;
  etiq_3: string;
  etiq_4: string;
  etiq_5: string;
  precio: number | null;
  stock: number | null;
  deta_1: string;
  deta_2: string;
  deta_3: string;
  img_1: string;
  img_2: string;
  img_3: string;
  img_4: string;
};

@Component({
  selector: 'create-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-product.html',
  styleUrl: './create-product.css'
})
export class CreateProduct implements OnDestroy {
  readonly maxImagenes = 4;
  readonly materialOptions = ['Oro', 'Plata', 'Otros'];
  readonly categoriaOptions = [
    'Anillo',
    'Collar',
    'Aretes',
    'Broche',
    'Pulsera',
    'Brazalete',
    'Pendiente',
    'Colgante',
    'Tobillera',
    'Tiara',
    'Corona'
  ];
  readonly etiq3Options = ['Dama', 'Caballero', 'Unisex', 'Niños'];
  readonly etiq4Options = [
    'Rojo',
    'Azul',
    'Rosa',
    'Plateado',
    'Dorado',
    'Púrpura',
    'Blanco',
    'Negro',
    'Verde',
    'Otro'
  ];

  arrastrando = false;
  subiendo = false;
  errorImagenes = '';
  imagenesSeleccionadas: VistaPreviaImagen[] = [];
  producto: ProductoForm = this.createEmptyProducto();

  constructor(private prodService: prod) {}

  ngOnDestroy(): void {
    this.limpiarVistasPrevias();
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.arrastrando = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.arrastrando = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.arrastrando = false;

    const archivos = Array.from(event.dataTransfer?.files ?? []);
    this.agregarImagenes(archivos);
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const archivos = Array.from(input.files ?? []);
    this.agregarImagenes(archivos);
    input.value = '';
  }

  agregarImagenes(files: File[]) {
    this.errorImagenes = '';

    const imagenesValidas = files.filter((file) => file.type.startsWith('image/'));
    const espaciosDisponibles = this.maxImagenes - this.imagenesSeleccionadas.length;

    if (imagenesValidas.length !== files.length) {
      this.errorImagenes = 'Solo se permiten archivos de imagen.';
    }

    if (espaciosDisponibles <= 0) {
      this.errorImagenes = 'Solo puedes cargar un máximo de 4 imágenes.';
      return;
    }

    if (imagenesValidas.length > espaciosDisponibles) {
      this.errorImagenes = 'Solo se agregarán las primeras 4 imágenes permitidas.';
    }

    const archivosPorAgregar = imagenesValidas.slice(0, espaciosDisponibles);

    archivosPorAgregar.forEach((file) => {
      this.imagenesSeleccionadas.push({
        file,
        previewUrl: URL.createObjectURL(file)
      });
    });
  }

  eliminarImagen(index: number) {
    const imagen = this.imagenesSeleccionadas[index];

    if (!imagen) {
      return;
    }

    URL.revokeObjectURL(imagen.previewUrl);
    this.imagenesSeleccionadas.splice(index, 1);
    this.errorImagenes = '';
  }

  guardarProducto(form: NgForm) {
    if (form.invalid || this.subiendo) {
      return;
    }

    this.subiendo = true;
    this.errorImagenes = '';

    if (this.imagenesSeleccionadas.length) {
      this.prodService.uploadImages(this.imagenesSeleccionadas.map((imagen) => imagen.file)).subscribe({
        next: (response) => {
          this.crearProductoConImagenes(form, response.paths);
        },
        error: (error) => {
          this.subiendo = false;
          this.errorImagenes = error?.error?.message || 'No fue posible subir las imágenes.';
        }
      });
      return;
    }

    this.prodService.createprod(this.prepararPayload([])).subscribe({
      next: () => {
        this.finalizarGuardado(form);
      },
      error: (error) => {
        this.subiendo = false;
        this.errorImagenes = error?.error?.message || 'No fue posible guardar el producto.';
      }
    });
  }

  private crearProductoConImagenes(form: NgForm, paths: string[]) {
    this.prodService.createprod(this.prepararPayload(paths)).subscribe({
      next: () => {
        this.finalizarGuardado(form);
      },
      error: (error) => {
        this.subiendo = false;
        this.errorImagenes = error?.error?.message || 'No fue posible guardar el producto.';
      }
    });
  }

  private prepararPayload(paths: string[]) {
    const sizeValue = Number(this.producto.etiq_1);
    const kilaValue = Number(this.producto.etiq_2);

    return {
      ...this.producto,
      etiq_1: sizeValue === 0 ? 'Size=Ajustable' : `Size=${sizeValue}`,
      etiq_2: kilaValue === 0 ? 'Pure=925' : `Kila=${kilaValue}`,
      precio: Number(this.producto.precio),
      stock: Number(this.producto.stock),
      img_1: paths[0] || '',
      img_2: paths[1] || '',
      img_3: paths[2] || '',
      img_4: paths[3] || ''
    };
  }

  private finalizarGuardado(form: NgForm) {
    this.subiendo = false;
    alert('Producto registrado correctamente');
    this.producto = this.createEmptyProducto();
    form.resetForm(this.createEmptyProducto());
    this.limpiarVistasPrevias();
    this.imagenesSeleccionadas = [];
  }

  private limpiarVistasPrevias() {
    this.imagenesSeleccionadas.forEach((imagen) => URL.revokeObjectURL(imagen.previewUrl));
  }

  private createEmptyProducto(): ProductoForm {
    return {
      nombre: '',
      material: '',
      categoria: '',
      etiq_1: '',
      etiq_2: '',
      etiq_3: '',
      etiq_4: '',
      etiq_5: '',
      precio: null,
      stock: null,
      deta_1: '',
      deta_2: '',
      deta_3: '',
      img_1: '',
      img_2: '',
      img_3: '',
      img_4: ''
    };
  }
}
