import {Component, NgModule, OnInit, TemplateRef, ViewChild, viewChild} from '@angular/core';
import {Client} from '../../model/client.entity';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {ClientService} from '../../services/client.service';
import {MatDialog, MatDialogTitle} from '@angular/material/dialog';
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable,
  MatTableDataSource
} from '@angular/material/table';
import {MatToolbar} from '@angular/material/toolbar';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatOption, MatSelect} from '@angular/material/select';
import {CommonModule, NgClass, NgTemplateOutlet} from '@angular/common';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [
    FormsModule,
    MatToolbar,
    MatButton,
    MatFormField,
    MatInput,
    MatSelect,
    MatOption,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCell,
    MatCellDef,
    NgClass,
    MatIconButton,
    MatIcon,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRowDef,
    MatRow,
    MatDialogTitle,
    ReactiveFormsModule,
    MatLabel,
    MatError,
    NgTemplateOutlet,
    CommonModule
  ],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css'
})
export class ClientsComponent implements OnInit {
  displayedColumns: string[] = ['fullName', 'status', 'actions'];
  dataSource = new MatTableDataSource<Client>();
  clientForm: FormGroup;
  filterValue: string = '';


  @ViewChild('addClientDialog') addClientDialog!: TemplateRef<any>;

  constructor(
    private clientService: ClientService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {
    this.clientForm = this.fb.group({
      fullName: ['', Validators.required],
      dni: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      birthDate: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(): void {
    this.clientService.getAll().subscribe(
      clients => this.dataSource.data = clients
    );
  }

  applyFilter(field: string, value: string): void {
    this.dataSource.filterPredicate = (data: Client, filter: string) => {
      if (field === 'name') {
        return data.fullName.toLowerCase().includes(filter);
      } else if (field === 'status') {
        return data.status === filter;
      }
      return false;
    };
    this.dataSource.filter = value.trim().toLowerCase();
  }

  deleteClient(id: number): void {
    // @ts-ignore
    this.clientService.delete(id).subscribe(() => this.loadClients());
  }

  openAddClientDialog(): void {
    this.dialog.open(this.addClientDialog);
  }

  onSubmit(): void {
    if (this.clientForm.valid) {
      this.clientService.create(this.clientForm.value).subscribe(() => {
        this.loadClients();
        this.dialog.closeAll();
        this.clientForm.reset();
      });
    }
  }
}
























