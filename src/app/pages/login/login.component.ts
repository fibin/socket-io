import { AuthService } from './../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { User } from '../../models/user.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit, OnDestroy {
  form: FormGroup;
  submitButtonText = 'Login';
  isLoginPage = true;
  private authSubscription: Subscription;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.buildForm();
    if (this.router.url === '/signup') {
      this.submitButtonText = 'Sign up';
      this.isLoginPage = false;
    }
}

submit(): void {
  console.log(this.form)
  if (this.form.valid && this.isLoginPage) {
    this.authSubscription = this.authService.auth(this.form.value).subscribe((res: User) => {
      localStorage.setItem('Auth', JSON.stringify(res));
      this.router.navigate(['/home'])
    });
  } else if(this.form.valid) {
    this.authSubscription = this.authService.signup(this.form.value).subscribe((res: User) => {
      localStorage.setItem('Auth', JSON.stringify(res));
      this.router.navigate(['/home'])
    });
  }
}

signUp(): void {
  this.router.navigate(['/signup']);
}

  private buildForm(): void {
    this.form = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required],
    });
  }

  ngOnDestroy(): void {
      this.authSubscription.unsubscribe();
  }
}
