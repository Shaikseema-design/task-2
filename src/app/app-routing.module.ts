import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './home/home.component';
import { StudentsComponent } from './students/students.component';
import { TeachersComponent } from './teachers/teachers.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TaskListComponent } from './tasks/task-list/task-list.component';
import { TaskDetailComponent } from './tasks/task-detail/task-detail.component';
import { TaskFormComponent } from './tasks/task-form/task-form.component';
import { AuthGuard } from './auth/auth.guard';
import { EditTaskComponent } from './tasks/edit-task/edit-task.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'students', component: StudentsComponent, canActivate: [AuthGuard] },
  { path: 'teachers', component: TeachersComponent, canActivate: [AuthGuard] },
  { path: 'dashboard/:id', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'student-tasks/:id', component: TaskListComponent, canActivate: [AuthGuard] },
  { path: 'student-tasks/:id/:taskId', component: TaskDetailComponent, canActivate: [AuthGuard] },
  { path: 'student-tasks/:id/edit/:taskId', component: TaskFormComponent, canActivate: [AuthGuard] }, // Edit route
  { path: 'student-tasks/:id/new', component: TaskFormComponent, canActivate: [AuthGuard] }, // Add route
  { path: 'task-form', component: TaskFormComponent },
  { path: 'edit-task/:id/:taskId', component: EditTaskComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }