import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {SupportService} from '../../services/support.service';
import {Support} from '../../model/support.entity';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatOption, MatSelect} from '@angular/material/select';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-customer-support',
  standalone: true,
  imports: [
    MatFormField,
    ReactiveFormsModule,
    MatSelect,
    MatOption,
    MatInput,
    MatButton,
    NgForOf,
    MatLabel
  ],
  templateUrl: './customer-support.component.html',
  styleUrl: './customer-support.component.css'
})
export class CustomerSupportComponent {
  supportForm: FormGroup;
  reportTypes: string[] = ['bug', 'consultation', 'sugesstion'];

  constructor(private fb: FormBuilder, private supportService: SupportService) {
    this.supportForm = this.fb.group({
      reportType: ['', Validators.required],
      description: ['',[ Validators.required, Validators.minLength(10)]]
    });
  }

  submitReport(){
    if(this.supportForm.valid){
      const newReport = new Support(
        Date.now(),
        this.supportForm.value.reportType,
        this.supportForm.value.description
      );
      this.supportService.create(newReport).subscribe({
        next: () => {
          alert('Report submitted successfully');
          this.supportForm.reset();
        },
        error: (err) =>{
          console.error('Error while submitting report', err);
        }
      });
    }
  }
}

































