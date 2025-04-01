import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../../models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm = this.fb.group({
   // Name field, initialized as empty string, required validator 
    name: ['', Validators.required],
   // Email field, required with email format validation 
    email: ['', [Validators.required, Validators.email]],
   // Phone field, required with a 10-digit pattern validation 
    phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
   // Username field, initialized as empty string, required validator 
    username: ['', Validators.required],
   // Username field, initialized as empty string, required validator 
    password: ['', [Validators.required, Validators.minLength(6)]],
    role: ['', Validators.required] // Added role field
  });

  isEditMode = false;
  userId: number | undefined;

  constructor(
    // FormBuilder instance for creating reactive forms
    private fb: FormBuilder,
    // AuthService instance for registration and user management
    private authService: AuthService,
    private router: Router,
    // MatSnackBar instance for showing snackbar notifications
    private snackBar: MatSnackBar
  ) {
    // Get navigation data passed from the previous route
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { teacher?: User; isTeacher?: boolean };
    // Check if a teacher object is passed
    if (state?.teacher) {
    // Set edit mode to true for updating an existing user  
      this.isEditMode = true;
    // Store the teacher’s ID for updating  
      this.userId = state.teacher.id;
      this.registerForm.patchValue(state.teacher);
    // Check if the form is for a new teacher
    } else if (state?.isTeacher) {
     // Pre-fill the role field with 'teacher' for new teacher registration
      this.registerForm.patchValue({ role: 'teacher' });
    // Default case for new registration (student)
    } else {
    // Pre-fill the role field with 'student' as the default  
      this.registerForm.patchValue({ role: 'student' }); // Default to student
    }
  }
 // Method called when the form is submitted
  onSubmit(): void {
  // Check if the form is valid (all required fields and validations pass)  
    if (this.registerForm.valid) {
      const user: User = this.registerForm.value as User;
      if (this.isEditMode && this.userId) {
      // Retrieve users array from localStorage, default to empty array if not found  
        const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
      // Find the index of the user to update by id 
        const index = users.findIndex(u => u.id === this.userId);
      // If user is found, update their data  
        if (index !== -1) {
        // Merge existing user data with updated form data  
          users[index] = { ...users[index], ...user };
        // Save updated users array back to localStorage  
          localStorage.setItem('users', JSON.stringify(users));
        // Show success notification for 3 seconds  
          this.snackBar.open('User updated successfully', 'Close', { duration: 3000 });
        // Navigate to appropriate page based on user role  
          this.router.navigate([users[index].role === 'teacher' ? '/teachers' : '/students']);
        }
        // Handle registration mode for new users
      } else {
        if (this.authService.register(user)) {
        // Show success notification for 3 seconds if registration success  
          this.snackBar.open('Registration successful! Please login.', 'Close', { duration: 3000 });
        // Navigate to login page after successful registration 
          this.router.navigate(['/login']);
        } else {
        // Show error notification for 3 seconds if registration fails  
          this.snackBar.open('Username or email already exists', 'Close', { duration: 3000 });
        }
      }
    }
  }
}