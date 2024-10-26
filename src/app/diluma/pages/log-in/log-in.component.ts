import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import {User} from '../../model/user.entity';
import {MatCard, MatCardTitle} from '@angular/material/card';
import {NgIf} from '@angular/common';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [
    MatCard,
    MatCardTitle,
    ReactiveFormsModule,
    NgIf,
    MatLabel,
    MatFormField,
    MatInput,
    MatButton,
    MatError
  ],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})
export class LogInComponent {
  loginForm!: FormGroup;
  registerForm!: FormGroup;
  isLoginMode = true;
  errorMessage = '';

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {}
  ngOnInit(): void {
      this.initializeForms();
  }

  private initializeForms(){
      this.loginForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]]
      });

      this.registerForm = this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        dni: ['', Validators.required]
      })
  }
  onLogin(){
    if(this.loginForm.invalid) return;
    const {email, password } = this.loginForm.value;
    this.userService.getAll().subscribe(users => {
      const user = users.find(u => u.email === email && u.password === password);
      if(user){
        this.router.navigate(['/resumen']); //Redirect to resumen page
      } else{
        this.errorMessage = 'Invalid email or password. Please try Again';
      }
    });
  }
  onRegister(){
    if (this.registerForm.invalid) return;
    const newUser = new User(
      0,
      this.registerForm.value.firstName,
      this.registerForm.value.lastName,
      this.registerForm.value.email,
      this.registerForm.value.password,
      this.registerForm.value.dni
    );
    this.userService.create(newUser).subscribe(() => {
      this.isLoginMode = true; //
    });
  }

  toggleMode(){
    this.isLoginMode = !this.isLoginMode;
    this.errorMessage = '';
  }
}





























