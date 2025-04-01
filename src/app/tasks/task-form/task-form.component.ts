import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../task.service';
import { Task } from '../../models/task';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {
  studentId: number;
  taskId: number | null = null;
  isEditMode = false;
// Reactive form definition with validation
  taskForm = this.fb.group({
    title: ['', Validators.required],
    description: [''],
    status: ['', Validators.required],
    dueDate: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService,
    private snackBar: MatSnackBar
  ) {
    // Initialize studentId from route parameters
    this.studentId = +this.route.snapshot.paramMap.get('id')!;
    const action = this.route.snapshot.paramMap.get('action');
    this.taskId = action === 'edit' ? +this.route.snapshot.paramMap.get('taskId')! : null;
    this.isEditMode = action === 'edit' && !!this.taskId;
    console.log('TaskFormComponent loaded - studentId:', this.studentId, 'taskId:', this.taskId, 'isEditMode:', this.isEditMode); // Debug
  }

  ngOnInit(): void {
    if (this.isEditMode && this.taskId) {
      const task = this.taskService.getTask(this.taskId);
      if (task) {
        this.taskForm.patchValue({
          title: task.title,
          description: task.description,
          status: task.status,
          dueDate: task.dueDate
        });
      } else {
        this.snackBar.open('Task not found', 'Close', { duration: 3000 });
        this.router.navigate(['/student-tasks', this.studentId]);
      }
    }
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const formValue = this.taskForm.value;
      const task: Task = {
        studentId: this.studentId,
        title: formValue.title || '',
        description: formValue.description || '',
        status: formValue.status as 'Pending' | 'In Progress' | 'Completed',
        dueDate: formValue.dueDate || ''
      };

      if (this.isEditMode && this.taskId) {
        task.id = this.taskId;
        this.taskService.updateTask(task);
        this.snackBar.open('Task updated successfully', 'Close', { duration: 3000 });
      } else {
        this.taskService.addTask(task);
        this.snackBar.open('Task added successfully', 'Close', { duration: 3000 });
      }
      this.router.navigate(['/student-tasks', this.studentId]);
    }
  }

  cancel(): void {
    this.router.navigate(['/student-tasks', this.studentId]);
  }
}