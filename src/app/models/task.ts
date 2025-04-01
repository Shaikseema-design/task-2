export interface Task {
    id?: number; // Optional, set by TaskService for new tasks
    studentId: number;
    title: string;
    description: string;
    status: 'Pending' | 'In Progress' | 'Completed'; // Updated to match form options
    dueDate: string;
  }