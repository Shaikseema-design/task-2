import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  // Define the loginForm as a FormGroup with username and password
  loginForm = this.fb.group({
   // Username field initialized as empty string ,and it is required validator 
    username: ['', Validators.required],
   // Password field initialized as empty string,and it is  required validator 
    password: ['', Validators.required]
  });

  constructor(
  // FormBuilder instance for creating reactive forms  
    private fb: FormBuilder,
   // AuthService instance for authentication operations 
    private authService: AuthService,
   // Router instance for programmatic navigation 
    private router: Router,
    // MatSnackBar instance for showing snackbar notifications
    private snackBar: MatSnackBar
  ) {}
  // Method called when the form is submitted
  onSubmit(): void {
  // Check if the form is valid (all required fields are filled)  
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      if (this.authService.login(username!, password!)) {
      // Show success notification for 3 seconds if login success  
        this.snackBar.open('Login successful!', 'Close', { duration: 3000 });
      // Navigate to the home route after successful login
        this.router.navigate(['/home']);
      } else {
       // Show error notification for 3 seconds if login fails 
        this.snackBar.open('Invalid credentials', 'Close', { duration: 3000 });
      }
    }
  }
}