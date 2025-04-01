import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
// Private property to store the currently logged-in user, null if no user is logged in  
  private currentUser: User | null = null;
// Method to authenticate a user based on username and password
  login(username: string, password: string): User | null {
  // Retrieve users array from localStorage, default to empty array if not found  
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
  // Find a user matching the provided username and password, return null if not found  
    const user = users.find(u => u.username === username && u.password === password) || null;
    // If a user is found, set them as the current user
    if (user) {
      this.currentUser = user;
    // Save the current user to localStorage  
      localStorage.setItem('currentUser', JSON.stringify(user));
    }
    //return the user
    return user;
  }
  // Method to register a new user
  register(user: User): boolean {
  // Retrieve users array from localStorage, default to empty array if not found  
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
  // Check if username or email already exists in the users array  
    if (users.some(u => u.username === user.username || u.email === user.email)) {
    // Return false if a duplicate is found
      return false;
    }
    // Assign a unique ID to the new user
    user.id = users.length ? Math.max(...users.map(u => u.id!)) + 1 : 1;
    // Add the new user to the users array
    users.push(user);
    // Save the updated users array back to localStorage
    localStorage.setItem('users', JSON.stringify(users));
    // return true to indicate successful registration
    return true;
  }
  // Method to log out the current user
  logout(): void {
  // Clear the currentUser property  
    this.currentUser = null;
  // Remove the current user from localStorage  
    localStorage.removeItem('currentUser');
  }
  // Method to check if a user is authenticated
  isAuthenticated(): boolean {
  // Return true if 'currentUser' exists in localStorage, false otherwise  
    return !!localStorage.getItem('currentUser');
  }
  // Method to retrieve the current user
  getCurrentUser(): User | null {
  // Retrieve and parse the current user from localStorage, return null if not found  
    return JSON.parse(localStorage.getItem('currentUser') || 'null');
  }
}