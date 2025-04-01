import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../tasks/task.service';
import { Task } from '../models/task';
import { User } from '../models/user';

@Component({
  selector: 'app-dashboard',
  templateUrl:"dashboard.component.html",
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  // Property to store the user id from the route
  userId: number;
  // Property to store the current user, undefined if not found
  user: User | undefined;
  // Array to store the user's tasks, initialized as empty
  tasks: Task[] = [];
  // Counter for the number of pending tasks, initialized to 0
  pendingTasks: number = 0;
  // Counter for the number of in-progress tasks, initialized to 0
  inProgressTasks: number = 0;
  // Counter for the number of completed tasks, initialized to 0
  completedTasks: number = 0;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService
  ) {
    // Initialize userId by extracting 'id' from route parameters, converting to number
    this.userId = +this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    // Retrieve users array from localStorage, default to empty array if not found
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    // Find the user matching the userId from the route
    this.user = users.find(u => u.id === this.userId);
    // Fetch tasks for the user using TaskService
    this.tasks = this.taskService.getTasks(this.userId);
    // Calculate the number of pending tasks by filtering tasks with 'Pending' status
    this.pendingTasks = this.tasks.filter(t => t.status === 'Pending').length;
    // Calculate the number of in-progress tasks by filtering tasks with 'in-progress' status
    this.inProgressTasks = this.tasks.filter(t => t.status === 'In Progress').length;
    // Calculate the number of completed tasks by filtering tasks with 'completed' status
    this.completedTasks = this.tasks.filter(t => t.status === 'Completed').length;
  }
}