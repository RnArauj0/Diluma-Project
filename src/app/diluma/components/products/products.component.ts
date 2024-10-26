import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Product} from '../../model/product.entity';
import {MatDialog, MatDialogActions, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ProductService} from '../../services/product.service';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef, MatTable
} from '@angular/material/table';
import {MatIcon} from '@angular/material/icon';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    MatDialogActions,
    MatButton,
    MatLabel,
    MatFormField,
    MatInput,
    ReactiveFormsModule,
    MatDialogTitle,
    MatDialogContent,
    MatRow,
    MatRowDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatIcon,
    MatIconButton,
    MatCell,
    MatHeaderCell,
    MatColumnDef,
    MatCellDef,
    MatHeaderCellDef,
    MatTable,
    FormsModule,
    CommonModule
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{
  @ViewChild('addProductDialog') addProductDialog!: TemplateRef<any>;
  displayedColumns: string[] = ['id', 'name', 'price', 'currency', 'stock', 'importe', 'actions'];
  products: Product[] =[];
  filteredProducts: Product[] = [];
  nameFilter: string = '';
  priceFilter: string = '';
  //addProductDialog!: MatDialogRef<any>;
  productForm!: FormGroup;

  constructor(
    private productService: ProductService,
    private dialog: MatDialog,
    private fb: FormBuilder
  ){}

  ngOnInit():void{
    this.productForm = this.fb.group({
      name: [''],
      price: [0],
      currency: ['PEN'],
      stock: [0],
      description: ['']
    });
    this.getProducts();
  }

  getProducts(){
    this.productService.getAll().subscribe((data: Product[]) =>{
      this.products = data;
      this.filteredProducts = data;
    })
  }

  applyFilter(field: string, value: string | number){
    this.filteredProducts = this.products.filter(product => {
      const matchesName = field === 'name' && product.name.toLowerCase().includes((value as string).toLowerCase());
      const matchesPrice = field === 'price' && product.price <= +value;
      return matchesName || matchesPrice;
    });
  }

  openAddProductDialog(): void {
    this.dialog.open(this.addProductDialog);
  }

  addProduct(): void {
    if (this.productForm.valid) {
      const newProduct = this.productForm.value as Product;
      this.productService.create(newProduct).subscribe(() => {
        this.getProducts();
        this.dialog.closeAll();  // Cierra todos los diálogos abiertos
      });
    }
  }
  closeDialog(): void {
    this.dialog.closeAll();
  }
  deleteProduct(id: number){
    this.productService.delete(id, null).subscribe(() => this.getProducts());
  }
}








































