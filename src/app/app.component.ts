import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
    <mat-toolbar style="background-color: rgb(120, 199, 230); color:white;" *ngIf="authService.isAuthenticated()">
      <span>School Task App</span>
      <span class="spacer"></span>
      <div class="btn" style="background-color:rgb(243, 130, 183);  border-radius:25px;"> 
      <button mat-button routerLink="/home">DashBoard</button>
      <button mat-button routerLink="/students">Students</button>
      <button mat-button routerLink="/teachers">Teachers</button>
      <button mat-button (click)="logout()">Logout</button>
      </div>
    </mat-toolbar>
    <router-outlet></router-outlet>
  `,
  styles: [`
    .spacer {
      flex: 1 1 auto;
    }
    mat-toolbar {
      margin-bottom: 20px;
    }
    btn{
      background-color:pink;
      font-size: 14px;
      margin-left: 8px;
      min-width: 120px;
      }
  `]
})
export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  constructor(public authService: AuthService, private router: Router) {}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}