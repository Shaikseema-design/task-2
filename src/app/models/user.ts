export interface User {
    id?: number;
    name: string;
    email: string;
    phone: string;
    username: string;
    password: string;
    role: 'student' | 'teacher'; // Added role property
  }