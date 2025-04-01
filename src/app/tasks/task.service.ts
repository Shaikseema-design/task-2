import { Injectable } from '@angular/core';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasksKey = 'tasks';

  getTasks(studentId: number): Task[] {
    // const tasks: Task[] = JSON.parse(localStorage.getItem(this.tasksKey) || '[]');
    // return tasks.filter(task => task.studentId === studentId);
    return JSON.parse(localStorage.getItem(this.tasksKey)||'[]');
  }

  getTask(id: number): Task | undefined {
    const tasks: Task[] = JSON.parse(localStorage.getItem(this.tasksKey) || '[]');
    return tasks.find(task => task.id === id);
  }

  addTask(task: Task): void {
    const tasks: Task[] = JSON.parse(localStorage.getItem(this.tasksKey) || '[]');
    task.id = tasks.length ? Math.max(...tasks.map(t => t.id!)) + 1 : 1;
    tasks.push(task);
    localStorage.setItem(this.tasksKey, JSON.stringify(tasks));
  }

  updateTask(task: Task): void {
    const tasks: Task[] = JSON.parse(localStorage.getItem(this.tasksKey) || '[]');
    const index = tasks.findIndex(t => t.id === task.id);
    if (index !== -1) {
      tasks[index] = task;
      localStorage.setItem(this.tasksKey, JSON.stringify(tasks));
    }
  }

  deleteTask(id: number): void {
    const tasks: Task[] = JSON.parse(localStorage.getItem(this.tasksKey) || '[]');
    const updatedTasks = tasks.filter(t => t.id !== id);
    localStorage.setItem(this.tasksKey, JSON.stringify(updatedTasks)); // Fixed typo
  }
}