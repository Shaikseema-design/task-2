import { Component } from '@angular/core';
import { TaskService } from '../task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from '../../models/task';
import { Location } from '@angular/common';
@Component({
  selector: 'app-task-list',
  templateUrl: "./task-list.component.html",
  styleUrls: ["./task-list.component.scss"]
})
export class TaskListComponent {
  studentId: number;
  tasks: Task[] = [];
  displayedColumns: string[] = ['title', 'status', 'dueDate', 'actions'];
  

  constructor(
    private taskService: TaskService,
    private location:Location,
    private route: ActivatedRoute,
    private router: Router
    
  ) {
    this.studentId = +this.route.snapshot.paramMap.get('id')!;
    console.log('TaskListComponent loaded for studentId:', this.studentId);
    this.tasks = this.taskService.getTasks(this.studentId);
    console.log('Tasks retrieved:', this.tasks);
  }

  addTask(): void {
    console.log('Add Task clicked, navigating to:', `/student-tasks/${this.studentId}/new`);
    this.router.navigate(['/student-tasks', this.studentId, 'new']);
  }

  deleteTask(id: number): void {
    this.taskService.deleteTask(id);
    this.tasks = this.taskService.getTasks(this.studentId);
    console.log('Tasks after deletion:', this.tasks);
  }
  goBack(): void {
    this.location.back(); // Navigate to previous page
  }
}