import { Component } from '@angular/core';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html', // Corrected to match file name
  styleUrls: ['./teachers.component.scss']
})
export class TeachersComponent {
  teachers: User[] = JSON.parse(localStorage.getItem('users') || '[]').filter((u: User) => u.role === 'teacher'); // Explicitly typed 'u'
  displayedColumns: string[] = ['name', 'email', 'phone', 'actions'];

  constructor(private router: Router, private snackBar: MatSnackBar) {}

  addTeacher(): void {
    this.router.navigate(['/register'], { state: { isTeacher: true } });
  }

  editTeacher(teacher: User): void {
    this.router.navigate(['/register'], { state: { teacher } });
  }

  deleteTeacher(id: number): void {
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsers = users.filter(u => u.id !== id);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    this.teachers = updatedUsers.filter((u: User) => u.role === 'teacher');
    this.snackBar.open('Teacher deleted successfully', 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }
}