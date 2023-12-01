import { Injectable } from '@angular/core';
import { Task } from '../models/Task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  tasks: Task[] = [
    new Task(1, 'Faire les courses', 'Acheter des ingrédients pour le dîner', new Date(), new Date(), 'moyenne', 1),
    new Task(2, 'Répondre aux emails', 'Répondre aux emails professionnels', new Date(), new Date(), 'élevée', 2)
  ];

  constructor() { }
  getAllTasks(): Task[] {
    return this.tasks;
  }
  getTaskById(id: number): Task | undefined {
    return this.tasks.find(task => task.getId() === id);
  }

  updateTask(id: number, updatedTask: any) {
    const task = this.tasks.find(task => task.getId() === id);
    if (task) {
      task.setName(updatedTask.name);
      task.setPriority(updatedTask.priority);
      task.setStatus(updatedTask.status);
      task.setEnd(updatedTask.end);
      task.setDescription(updatedTask.description);
    }
  }

  deleteTask(id: number) {
    const index = this.tasks.findIndex(task => task.getId() === id);
    if (index !== -1) {
      this.tasks.splice(index, 1);
    }
  }
}