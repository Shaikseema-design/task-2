import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../task.service';
import { Task } from '../../models/task';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
  
})
export class EditTaskComponent implements OnInit {
  studentId: number;
  taskId: number;
  editTaskForm = this.fb.group({
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
    // Initialize studentId by extracting 'id' from route parameters, converting to number
    this.studentId = +this.route.snapshot.paramMap.get('id')!;
    // Initialize taskId by extracting 'taskId' from route parameters, converting to number
    this.taskId = +this.route.snapshot.paramMap.get('taskId')!;
  }

  ngOnInit(): void {
    // Retrieve the task by ID using TaskService
    const task = this.taskService.getTask(this.taskId);
    // If task exists, populate the form with its data
    if (task) {
      this.editTaskForm.patchValue({
        title: task.title,
        description: task.description,
        status: task.status,
        dueDate: task.dueDate
      });
    } else {
      // Show error notification for 3 seconds if task is not found
      this.snackBar.open('Task not found', 'Close', { duration: 3000 });
      // Navigate back to the student's task list if task is not found
      this.router.navigate(['/student-tasks', this.studentId]);
    }
  }
  // Method called when the form is submitted
  onSubmit(): void {
    // Check if the form is valid
    if (this.editTaskForm.valid) {
     // Create a task object with updated values 
      const formValue = this.editTaskForm.value;
      const task: Task = {
        id: this.taskId,
        studentId: this.studentId,
        title: formValue.title || '',
        description: formValue.description || '',
        status: formValue.status as 'Pending' | 'In Progress' | 'Completed',
        dueDate: formValue.dueDate || ''
      };
    // Update the task using TaskService
      this.taskService.updateTask(task);
      // Show success notification for 3 seconds
      this.snackBar.open('Task updated successfully', 'Close', { duration: 3000 });
      // Navigate back to the student's task list
      this.router.navigate(['/student-tasks', this.studentId]);
    }
  }
// Method to cancel editing and return to the task list
  cancel(): void {
    // Navigate back to the student's task list without saving changes
    this.router.navigate(['/student-tasks', this.studentId]);
  }
}