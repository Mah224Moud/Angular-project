import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../models/Task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  tasks: Task[] = [];

  constructor(private http: HttpClient) {
    this.loadTasks();
  }

  loadTasks() {
    if (localStorage.getItem('tasks')) {
      this.tasks = JSON.parse(localStorage.getItem('tasks') || '[]').map((task: any) => new Task(
        task.id,
        task.name, 
        task.description,
        new Date(task.start), 
        new Date(task.end), 
        task.priority,
        task.level, 
        task.status));
    } else {
      this.http.get<Task[]>('assets/data/tasks.json').subscribe(data => {
        this.tasks = data;
        this.saveTasks();
      });
    }
  }

  saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  getAllTasks(): Task[] {
    return this.tasks.filter(task => task.getStatus() !== 'terminée');
  }

  getCompletedTasks(): Task[] {
    return this.tasks.filter(task => task.getStatus() === 'terminée');
  }
  
  getTaskById(id: number): Task | undefined {
    return this.tasks.find(task => task.getId() === id);
  }

  updateTask(id: number, updatedTask: any) {
    const index = this.tasks.findIndex(task => task.getId() === id);
    if (index !== -1) {
      this.tasks[index].setName(updatedTask.name);
      this.tasks[index].setPriority(updatedTask.priority);
      this.tasks[index].setStatus(updatedTask.status);
      this.tasks[index].setEnd(updatedTask.end);
      this.tasks[index].setDescription(updatedTask.description);
      this.saveTasks();
    }
  }

  updateTaskStatus(id: number, status: string) {
    const index = this.tasks.findIndex(task => task.getId() === id);
    if (index !== -1) {
      this.tasks[index].setStatus(status);
      this.saveTasks();
    }
  }

  addTask(newTask: Task) {
    this.tasks.push(newTask);
    this.saveTasks();
  }

  getLastId(): number {
    return this.tasks.length > 0 ? this.tasks[this.tasks.length - 1].getId() : 0;
  }

  deleteTask(id: number) {
    const index = this.tasks.findIndex(task => task.getId() === id);
    if (index !== -1) {
      this.tasks.splice(index, 1);
      this.saveTasks();
    }
  }
}