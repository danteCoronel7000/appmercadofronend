import { Component, inject } from '@angular/core';
import { ProductoDTOForWeb } from '../../../productos/models/producto.model';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClienteDTOForVenta, ClienteDTOForWeb } from '../../../clientes/models/cliente.model';
import { Router, RouterLink } from '@angular/router';
import { ClienteService } from '../../../clientes/services/cliente.service';
import { ProductoService } from '../../../productos/services/producto.service';
import { VentaService } from '../../services/venta.service';
import { CommonModule } from '@angular/common';
import { ProductoDtoCompras, ProveedorDto } from '../../../compras/models/compras.model';
import { ComprasService } from '../../../compras/services/compras.service';
import { ItemVentaResponse, VentaResponse } from '../../models/venta.model';
import { UsuarioService } from '../../../../core/components/usuarios/services/usuario.service';
import { Authentication } from '../../../../core/services/authentication.service';

@Component({
  selector: 'app-registrar-venta',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './registrar-venta.html',
  styleUrl: './registrar-venta.css'
})
export default class RegistrarVenta {

  ventaForm: FormGroup;
  numeroVenta: string = "";
  listClientes: ClienteDTOForVenta[] = [];
  listProductos: ProductoDTOForWeb[] = [];
  productoService = inject(ProductoService);
  ventaService = inject(VentaService)
  clienteService = inject(ClienteService);
  authService = inject(Authentication);

  listClientesModal: ClienteDTOForVenta[] = [];

  isModalOpen = false;


  success = false;

  // Variables de paginación
  currentPage: number = 0;
  pageSize: number = 8;
  totalPages: number = 0;
  totalElements: number = 0;
  isFirst: boolean = true;
  isLast: boolean = false;

  // Variables de ordenamiento
  sortBy: string = 'nombre';
  sortDir: string = 'asc';

  // Variable para búsqueda
  searchTerm: string = '';

  // Variables de paginación
  currentPageCli: number = 0;
  pageSizeCli: number = 4;
  totalPagesCli: number = 0;
  totalElementsCli: number = 0;
  isFirstCli: boolean = true;
  isLastCli: boolean = false;

  // Variables de ordenamiento
  sortByCli: string = 'id';
  sortDirCli: string = 'asc';

  // Variable para búsqueda
  searchTermCli: string = '';

  constructor(private fb: FormBuilder, private router: Router) {


    this.ventaForm = this.fb.group({
      numeroVenta: [this.numeroVenta, [Validators.required, Validators.min(1)]],
      montoTotal: [0, [Validators.required, Validators.min(0)]],
      estado: ['PENDIENTE', [Validators.required, Validators.maxLength(20)]],
      nroFactura: [null, Validators.maxLength(50)],
      moneda: ['BOB', [Validators.required, Validators.maxLength(3)]],
      usuarioId:[''],
      clienteId: [null, [Validators.required, Validators.min(1)]],
      itemsVenta: this.fb.array([])
    });

    this.getNumeroVenta();
    this.getProductos();
    this.getClientes();

  }
  // Getter para acceder al FormArray
  get itemsVenta(): FormArray {
    return this.ventaForm.get('itemsVenta') as FormArray;
  }

  getProductos(): void {
    this.productoService.getProductosPaginados(
      this.currentPage,
      this.pageSize,
      this.sortBy,
      this.sortDir
    ).subscribe({
      next: (response) => {
        this.listProductos = response.content;
        this.totalPages = response.totalPages;
        this.totalElements = response.totalElements;
        this.isFirst = response.first;
        this.isLast = response.last;
        console.log('Página recibida:', response);
      },
      error: (err) => console.error('Error al obtener productos', err)
    });
  }



  getNumeroVenta(): void {
    this.ventaService.getNumeroVenta().subscribe({
      next: (noVenta) => {
        this.numeroVenta = noVenta;
        this.ventaForm.get('numeroVenta')?.setValue(noVenta + 1);
        console.log("orden venta ", this.numeroVenta);
      }
    });
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
    const items = this.itemsVenta.controls;
    const total = items.reduce((sum, item) => {
      return sum + (item.get('totalItem')?.value || 0);
    }, 0);

    this.ventaForm.get('montoTotal')?.setValue(total, { emitEvent: false });
  }


  // Remover un item del array
  removeItem(index: number) {
    this.itemsVenta.removeAt(index);
    this.calculateMontoTotal();
  }

  // Inserta en el formulario los items que ya existían en la venta.
// Reconstruye cada producto vendido para poder visualizarlo o editarlo.
  loadItems(items: ItemVentaResponse[]) {
    this.itemsVenta.clear();

    items.forEach(item => {
      const itemGroup = this.fb.group({
        id: [item.id],
        productoId: [item.productoId],
        nombre: [item.productoNombre],
        precioUnitario: [item.precioUnitario],
        cantidad: [item.cantidad],
        subtotal: [{ value: item.precioUnitario * item.cantidad, disabled: true }]
      });

      this.itemsVenta.push(itemGroup);
    });
  }


  // Método para obtener los valores del formulario completo
  getFormValue() {
    const formValue = this.ventaForm.getRawValue();
    // Incluir los valores deshabilitados de los items
    formValue.itemsVenta = this.itemsVenta.controls.map(item => item.getRawValue());
    return formValue;
  }

  // Carga en el formulario los datos completos de una venta existente para su edición.
// Básicamente revive la venta desde el backend y la deja lista para modificar.
  loadVenta(venta: VentaResponse) {
    this.ventaForm.patchValue({
      id: venta.id,
      numeroVenta: venta.numeroVenta,
      montoTotal: venta.montoTotal,
      estado: venta.estado,
      nroFactura: venta.nroFactura,
      moneda: venta.moneda,
      clienteId: venta.clienteId
    });

    if (venta.items?.length) {
      this.loadItems(venta.items);
    }
  }



  // Método para resetear el formulario
  resetForm() {
    this.ventaForm.reset({
      id: 0,
      numeroVenta: 0,
      montoTotal: 0,
      estado: 'PENDIENTE',
      nroFactura: null,
      moneda: 'BOB',
      proveedorId: null
    });
    this.itemsVenta.clear();
  }

  // Método para validar y enviar
  onSubmit() {
    if (this.ventaForm.valid && this.itemsVenta.length > 0) {
      const compraData = this.getFormValue();
      compraData.fechaActualizacion = new Date().toISOString();
      compraData.usuarioId = this.authService.getIdUsuario();
      console.log('venta form: ', compraData)
      //logica para llamar al servicio y consumir el endPoint
      
      this.ventaService.registrarVenta(compraData).subscribe({
        next: (response) => {
          console.log('Orden de venta registrada exitosamente:', response);

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
      this.markFormGroupTouched(this.ventaForm);
      this.itemsVenta.controls.forEach(item => {
        this.markFormGroupTouched(item as FormGroup);
      });
    }
  }

  // Método auxiliar para marcar todos los campos como tocados
  private markFormGroupTouched(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

  agregarProducto(producto: ProductoDTOForWeb) {

    // Buscar si el producto ya está agregado
    const index = this.itemsVenta.controls.findIndex(
      (ctrl: any) => ctrl.get('productoId')?.value === producto.id
    );

    if (index !== -1) {
      // Si ya existe, aumentar cantidad
      this.incrementQuantity(index);
    } else {
      // Si no existe, crear item y pasar el ID
      this.addItem(producto.id);
    }
  }

// Crea un nuevo item de venta con valores iniciales y validaciones.
// También configura cálculos automáticos como subtotal, descuentos y total por item.
// Ideal para cuando el usuario agrega un producto nuevo a la venta.
  createItemVenta(productoId: number): FormGroup {
    const itemGroup = this.fb.group({
      cantidad: [1, [Validators.required, Validators.min(1), Validators.max(999999999)]],
      precioUnitario: [0, [Validators.required, Validators.min(0)]],
      subTotal: [{ value: 0, disabled: true }],
      descuentoUnitario: [0, Validators.min(0)],
      subTotalDescuento: [{ value: 0, disabled: true }],
      totalItem: [{ value: 0, disabled: true }],
      productoId: [productoId, [Validators.required, Validators.min(1)]]
    });

    // Ejecutar de inmediato
    if (productoId) {
      this.loadPrecio(productoId, itemGroup);
    }

    // Y también cuando cambie
    itemGroup.get('productoId')?.valueChanges.subscribe(id => {
      if (id) {
        this.loadPrecio(id, itemGroup);
      }
    });

    this.setupItemCalculations(itemGroup);

    return itemGroup;
  }

  // Método helper para separar lógica
  private loadPrecio(productoId: number, itemGroup: FormGroup) {
    this.productoService.getProductoByIdForCompraDto(productoId).subscribe({
      next: (response) => {
        itemGroup.get('precioUnitario')?.setValue(response.precio, { emitEvent: true });
        console.log('precio del producto: ', response.precio);
      },
      error: (error) => console.error('Error al obtener el producto:', error)
    });
  }


  addItem(productoId: number) {
    const item = this.createItemVenta(productoId);
    this.itemsVenta.push(item);
  }



  // Incrementar cantidad
  incrementQuantity(index: number) {
    const item = this.itemsVenta.at(index);
    const currentValue = item.get('cantidad')?.value || 0;
    item.get('cantidad')?.setValue(currentValue + 1);
  }

  // Decrementar cantidad
  decrementQuantity(index: number) {
    const item = this.itemsVenta.at(index);
    const currentValue = item.get('cantidad')?.value || 1;
    if (currentValue > 1) {
      item.get('cantidad')?.setValue(currentValue - 1);
    }
  }

  // Calcular subtotal (suma de todos los items sin descuento)
  calculateSubtotal(): number {
    return this.itemsVenta.controls.reduce((sum, item) => {
      return sum + (item.get('subTotal')?.value || 0);
    }, 0);
  }

  getProductName(productoId: any): string {
    const producto = this.listProductos.find(p => p.id === productoId);
    return producto ? producto.nombre : '';
  }

  //verificar backen por que cambiamos para que reciba ProductoDTOForWeb
  buscarPorNombre(nombre: string): void {
    const value = nombre.trim();
    if (value) {
      this.productoService.buscarProducto(value).subscribe({
        next: (productos) => this.listProductos = productos,
        error: (err) => console.log('error al buscar', err)
      });
    } else {
      this.getProductos();
    }
  }
  cambiarPagina(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.currentPage = page;
      this.getProductos();
    }
  }

  cambiarPageSize(event: Event): void {
    const target = event.target as HTMLSelectElement;
    if (target) {
      this.pageSize = parseInt(target.value);
      this.currentPage = 0;
      this.getProductos();
    }
  }

  cambiarPaginaModalCli(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.currentPage = page;
      this.getProductos();
    }
  }

  cambiarPageSizeModalCli(event: Event): void {
    const target = event.target as HTMLSelectElement;
    if (target) {
      this.pageSize = parseInt(target.value);
      this.currentPage = 0;
      this.getProductos();
    }
  }

  mostrarExito(): void {
    this.success = true;

    setTimeout(() => {
      this.success = false;
    }, 800); // 2.5 segundos visible
  }



  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  //verificar backend por que cambiamos para que reciba ClienteDTOForWeb
  buscarPorNombreCli(nombre: string): void {
    const value = nombre.trim();
    if (value) {
      this.clienteService.buscarCliente(value).subscribe({
        next: (clientes) => this.listClientes = clientes,
        error: (err) => console.log('error al buscar', err)
      });
    } else {
      this.getClientes();
    }
  }

  getClientes(): void {
    this.clienteService.getClientesPaginados(
      this.currentPageCli,
      this.pageSizeCli,
      this.sortByCli,
      this.sortDirCli
    ).subscribe({
      next: (response) => {
        this.listClientes = response.content;
        this.totalPagesCli = response.totalPages;
        this.totalElementsCli = response.totalElements;
        this.isFirstCli = response.first;
        this.isLastCli = response.last;
        console.log('Página recibida:', response);
      },
      error: (err) => console.error('Error al obtener clientes', err)
    });
  }

agregarCliente(clienteId: number, event?: Event) {
  // Detener la propagación del evento
  if (event) {
    event.stopPropagation();
  }

  const clienteControl = this.ventaForm.get('clienteId');

  clienteControl?.setValue(clienteId);
  clienteControl?.markAsDirty();
  clienteControl?.markAsTouched();
  clienteControl?.updateValueAndValidity();

  // Cerrar el modal directamente
  this.closeModal();
  
  // Debug opcional
  if (!clienteControl?.valid) {
    console.warn('clienteId inválido', clienteControl?.errors);
  }
}


  cambiarPageSizeCli(event: Event): void {
    const target = event.target as HTMLSelectElement;
    if (target) {
      this.pageSizeCli = parseInt(target.value);
      this.currentPageCli = 0;
      this.getClientes();
    }
  }

  cambiarPaginaCli(page: number): void {
    if (page >= 0 && page < this.totalPagesCli) {
      this.currentPageCli = page;
      this.getClientes();
    }
  }


}


