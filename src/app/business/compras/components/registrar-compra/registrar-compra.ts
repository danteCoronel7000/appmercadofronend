import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ComprasService } from '../../services/compras.service';
import { ProductoDtoCompras, ProveedorDto } from '../../models/compras.model';
import { ProductoService } from '../../../productos/services/producto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrar-compra',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './registrar-compra.html',
  styleUrl: './registrar-compra.css'
})
export default class RegistrarCompra {
  compraForm: FormGroup;
  numeroOrden: string = "";
  listProveedor: ProveedorDto[] = [];
  listProductos: ProductoDtoCompras[] = [];
  compraService = inject(ComprasService);
  productoService = inject(ProductoService);
  success = false;

  constructor(private fb: FormBuilder, private router: Router) {


    this.compraForm = this.fb.group({
      numeroOrden: [this.numeroOrden, [Validators.required, Validators.min(1)]],
      montoTotal: [0, [Validators.required, Validators.min(0)]],
      fechaCreacion: [new Date().toISOString(), Validators.required],
      estado: ['PENDIENTE', [Validators.required, Validators.maxLength(20)]],
      nroFactura: [null, Validators.maxLength(50)],
      moneda: ['BOB', [Validators.required, Validators.maxLength(3)]],
      proveedorId: [null, [Validators.required, Validators.min(1)]],
      itemsCompra: this.fb.array([])
    });

    this.getProveedores();
    this.getNumeroOrden();
    this.getProductos();

  }
  // Getter para acceder al FormArray
  get itemsCompra(): FormArray {
    return this.compraForm.get('itemsCompra') as FormArray;
  }

  getProveedores(): void {
    this.compraService.getProveedores().subscribe({
      next: (response) => {
        this.listProveedor = response
        console.log('proveedores>: ', response)
      }
    })
  }

  getProductos(): void {
    this.compraService.getProductos().subscribe({
      next: (response) => {
        this.listProductos = response
        console.log("lista productos: ", response)
      }
    })
  }

  getNumeroOrden(): void {
    this.compraService.getNumeroOrden().subscribe({
      next: (norden) => {
        this.numeroOrden = norden;
        this.compraForm.get('numeroOrden')?.setValue(norden+1);
        console.log("orden", this.numeroOrden);
      }
    });
  }

  // Crear un nuevo item de compra
  createItemCompra(): FormGroup {
    const itemGroup = this.fb.group({
      cantidad: [1, [Validators.required, Validators.min(1), Validators.max(999999999)]],
      precioUnitario: [0, [Validators.required, Validators.min(0)]],
      subTotal: [{ value: 0, disabled: true }],
      descuentoUnitario: [0, Validators.min(0)],
      subTotalDescuento: [{ value: 0, disabled: true }],
      totalItem: [{ value: 0, disabled: true }],
      productoId: [null, [Validators.required, Validators.min(1)]]
    });

    // Suscribirse a cambios en productoId
    itemGroup.get('productoId')?.valueChanges.subscribe(productoId => {
      if (productoId) {
        this.productoService.getProductoByIdForCompraDto(productoId).subscribe({
          next: (response) => {
            itemGroup.get('precioUnitario')?.setValue(response.precio, { emitEvent: true });
          },
          error: (error) => {
            console.error('Error al obtener el producto para llenar el campo:', error);
          }
        });
      }
    });

    // Suscribirse a cambios para calcular automáticamente
    this.setupItemCalculations(itemGroup);

    return itemGroup;
  }

  // Configurar cálculos automáticos para un item
  private setupItemCalculations(itemGroup: FormGroup) {
    // Observar cambios en cantidad, precioUnitario y descuentoUnitario
    itemGroup.get('cantidad')?.valueChanges.subscribe(() => {
      this.calculateItemTotals(itemGroup);
    });

    itemGroup.get('precioUnitario')?.valueChanges.subscribe(() => {
      this.calculateItemTotals(itemGroup);
    });

    itemGroup.get('descuentoUnitario')?.valueChanges.subscribe(() => {
      this.calculateItemTotals(itemGroup);
    });
  }

  // Calcular totales de un item
  private calculateItemTotals(itemGroup: FormGroup) {
    const cantidad = itemGroup.get('cantidad')?.value || 0;
    const precioUnitario = itemGroup.get('precioUnitario')?.value || 0;
    const descuentoUnitario = itemGroup.get('descuentoUnitario')?.value || 0;

    // Calcular subTotal
    const subTotal = cantidad * precioUnitario;
    itemGroup.get('subTotal')?.setValue(subTotal, { emitEvent: false });

    // Calcular subTotalDescuento
    const subTotalDescuento = subTotal - (descuentoUnitario * cantidad);
    itemGroup.get('subTotalDescuento')?.setValue(subTotalDescuento, { emitEvent: false });

    // Calcular totalItem (es el mismo que subTotalDescuento)
    itemGroup.get('totalItem')?.setValue(subTotalDescuento, { emitEvent: false });

    // Recalcular el monto total de la compra
    this.calculateMontoTotal();
  }

  // Calcular monto total de la compra sumando todos los items
  private calculateMontoTotal() {
    const items = this.itemsCompra.controls;
    const total = items.reduce((sum, item) => {
      return sum + (item.get('totalItem')?.value || 0);
    }, 0);

    this.compraForm.get('montoTotal')?.setValue(total, { emitEvent: false });
  }

  // Agregar un nuevo item al array
  addItem() {
    this.itemsCompra.push(this.createItemCompra());
  }

  // Remover un item del array
  removeItem(index: number) {
    this.itemsCompra.removeAt(index);
    this.calculateMontoTotal();
  }

  // Cargar items existentes (para edición)
  loadItems(items: any[]) {
    this.itemsCompra.clear();
    items.forEach(item => {
      const itemGroup = this.createItemCompra();
      itemGroup.patchValue(item);
      this.itemsCompra.push(itemGroup);
    });
  }

  // Método para obtener los valores del formulario completo
  getFormValue() {
    const formValue = this.compraForm.getRawValue();
    // Incluir los valores deshabilitados de los items
    formValue.itemsCompra = this.itemsCompra.controls.map(item => item.getRawValue());
    return formValue;
  }

  // Método para cargar datos existentes (edición)
  loadCompra(compra: any) {
    this.compraForm.patchValue({
      id: compra.id,
      numeroOrden: compra.numeroOrden,
      montoTotal: compra.montoTotal,
      fechaCreacion: compra.fechaCreacion,
      fechaActualizacion: compra.fechaActualizacion,
      estado: compra.estado,
      nroFactura: compra.nroFactura,
      moneda: compra.moneda,
      proveedorId: compra.proveedorId
    });

    if (compra.itemsCompra && compra.itemsCompra.length > 0) {
      this.loadItems(compra.itemsCompra);
    }
  }

  // Método para resetear el formulario
  resetForm() {
    this.compraForm.reset({
      id: 0,
      numeroOrden: 0,
      montoTotal: 0,
      fechaCreacion: new Date().toISOString(),
      fechaActualizacion: null,
      estado: 'PENDIENTE',
      nroFactura: null,
      moneda: 'BOB',
      proveedorId: null
    });
    this.itemsCompra.clear();
  }

  // Método para validar y enviar
  onSubmit() {
    if (this.compraForm.valid && this.itemsCompra.length > 0) {
      const compraData = this.getFormValue();
      compraData.fechaActualizacion = new Date().toISOString();
      //logica para llamar al servicio y consumir el endPoint
    this.compraService.registrarOrdenCompra(compraData).subscribe({
        next: (response) => {
          console.log('Orden de compra registrada exitosamente:', response);
          
          // Limpiar el formulario después del éxito
          this.resetForm();

           this.mostrarExito()
          // Esperamos 1 segundo antes de navegar
          setTimeout(() => {
            this.router.navigate(['/metricas']);
          }, 800);
        }
      });
    } else {
      this.markFormGroupTouched(this.compraForm);
      this.itemsCompra.controls.forEach(item => {
        this.markFormGroupTouched(item as FormGroup);
      });

      if (this.itemsCompra.length === 0) {
        alert('Debe agregar al menos un producto a la compra');
      }
    }
  }

  // Método auxiliar para marcar todos los campos como tocados
  private markFormGroupTouched(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

  // Incrementar cantidad
  incrementQuantity(index: number) {
    const item = this.itemsCompra.at(index);
    const currentValue = item.get('cantidad')?.value || 0;
    item.get('cantidad')?.setValue(currentValue + 1);
  }

  // Decrementar cantidad
  decrementQuantity(index: number) {
    const item = this.itemsCompra.at(index);
    const currentValue = item.get('cantidad')?.value || 1;
    if (currentValue > 1) {
      item.get('cantidad')?.setValue(currentValue - 1);
    }
  }

  // Calcular subtotal (suma de todos los items sin descuento)
  calculateSubtotal(): number {
    return this.itemsCompra.controls.reduce((sum, item) => {
      return sum + (item.get('subTotal')?.value || 0);
    }, 0);
  }

  getProductName(productoId: any): string {
  const producto = this.listProductos.find(p => p.id === productoId);
  return producto ? producto.nombre : '';
}

 mostrarExito(): void {
    this.success = true;

    setTimeout(() => {
      this.success = false;
    }, 800); // 2.5 segundos visible
  }
}
