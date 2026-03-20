import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modify-product',
  templateUrl: './modify-product.html',
  styleUrls: ['./modify-product.css']
})
export class ModifyProduct {

  @Input() producto: any;
  @Output() guardarCambios = new EventEmitter<any>();

  guardar(){
    this.guardarCambios.emit(this.producto);
  }

}
