import { AuthService } from './../../services/auth.service';
import { Component, OnDestroy } from '@angular/core';
import { User } from '../../models/user.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnDestroy {
  user: User = JSON.parse(localStorage.getItem('auth') || '{}');

  private authSubscription: Subscription;

  constructor(private authService: AuthService) {

  }

  logout(): void {
    this.authSubscription = this.authService.logout().subscribe(() => {
      localStorage.removeItem('Auth');
    });
  }

  ngOnDestroy(): void {
      this.authSubscription.unsubscribe();
  }
}
