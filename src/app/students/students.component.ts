import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from '../models/user';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent {
  // Array to store students, filtered from localStorage users with role 'student'
  students: User[] = JSON.parse(localStorage.getItem('users') || '[]').filter((u: User) => u.role === 'student');
  // Array of column names to display in the table
  displayedColumns: string[] = ['name', 'email', 'phone', 'actions'];
  showAddForm = false;
  showEditForm = false;
  editingStudent: User | null = null;
// Form group for adding a new student with validation rules
  addStudentForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
    username: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });
// Form group for editing an existing student with validation rule
  editStudentForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
    username: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  toggleAddForm(): void {
    this.showAddForm = !this.showAddForm;
    if (!this.showAddForm) {
      this.addStudentForm.reset();
    }
    this.showEditForm = false;
  }
// Method to add a new student
  addStudent(): void {
    // Check if the add form is valid
    if (this.addStudentForm.valid) {
    // Create a new student object with form values, role 'student', and a unique id  
      const newStudent: User = {
        ...this.addStudentForm.value,
        role: 'student',
        id: this.generateUniqueId()
      } as User;
    // Retrieve users array from localStorage, default to empty array if not found
      const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
      // Check for duplicate username or email
      if (users.some(u => u.username === newStudent.username || u.email === newStudent.email)) {
       //Show error notification if duplicate exists
        this.snackBar.open('Username or email already exists', 'Close', { duration: 3000 });
        return;
      }
    // Add the new student to the users array
      users.push(newStudent);
      // Save updated users array to localStorage
      localStorage.setItem('users', JSON.stringify(users));
      // Update the students array with the filtered list
      this.students = users.filter((u: User) => u.role === 'student');
      // Show success notification for 3 seconds
      this.snackBar.open('Student added successfully', 'Close', { duration: 3000 });
      this.toggleAddForm();
    }
  }
  // Method to toggle visibility of the edit student form
  toggleEditForm(student: User | null): void { // Made 'student' optional with 'User | null'
    this.showEditForm = !this.showEditForm;
    this.editingStudent = this.showEditForm ? student : null;
    if (this.showEditForm && student) {
      this.editStudentForm.patchValue(student); // Only patch if student is provided
    } else {
      this.editStudentForm.reset();
    }
    this.showAddForm = false;
  }
  // Method to update an existing student
  editStudent(): void {
    if (this.editStudentForm.valid && this.editingStudent) {
      // Merge existing student data with updated form values
      const updatedStudent: User = {
        ...this.editingStudent,
        ...this.editStudentForm.value
      } as User;

      const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
      // Find the index of the student to update by ID
      const index = users.findIndex(u => u.id === updatedStudent.id);
      if (index !== -1) {
        const duplicate = users.some(u => 
          (u.username === updatedStudent.username || u.email === updatedStudent.email) && 
          u.id !== updatedStudent.id
        );
        if (duplicate) {
          this.snackBar.open('Username or email already exists', 'Close', { duration: 3000 });
          return;
        }
      // Update the student in the users array
        users[index] = updatedStudent;
      // Save updated users array to localStorage  
        localStorage.setItem('users', JSON.stringify(users));
        // Update the students array with the filtered list
        this.students = users.filter((u: User) => u.role === 'student');
        this.snackBar.open('Student updated successfully', 'Close', { duration: 3000 });
        this.toggleEditForm(null); // Pass null to hide form after update
      }
    }
  }
  // Method to delete a student by ID
  deleteStudent(id: number): void {
  // Retrieve users array from localStorage, default to empty array if not found  
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
  // Filter out the student with the given ID 
    const updatedUsers = users.filter(u => u.id !== id);
  // Save updated users array to localStorage  
    localStorage.setItem('users', JSON.stringify(users));
  // Update the students array with the filtered list  
    this.students = updatedUsers.filter((u: User) => u.role === 'student');
    this.snackBar.open('Student deleted successfully', 'Close', { duration: 3000 });
  }

  private generateUniqueId(): number {
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    return users.length ? Math.max(...users.map(u => u.id!)) + 1 : 1;
  }
}