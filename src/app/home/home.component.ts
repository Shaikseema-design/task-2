import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { User } from '../models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  currentUser: User | null;

  constructor(private authService: AuthService) {
    this.currentUser = this.authService.getCurrentUser();
  }
}