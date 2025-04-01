import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../task.service';
import { Task } from '../../models/task';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit {
  studentId: number;
  taskId: number;
  task: Task | undefined;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService
  ) {
    this.studentId = +this.route.snapshot.paramMap.get('id')!;// Get student ID from URL
    this.taskId = +this.route.snapshot.paramMap.get('taskId')!;// Get task ID from URL
  }

  ngOnInit(): void {
    // Fetch task details using the task service
    this.task = this.taskService.getTask(this.taskId);
    // Log the loaded task for debugging purposes
    console.log('TaskDetailComponent loaded:', this.task);
  }
}