import { Injectable } from '@angular/core';
import { Task } from '../../Task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  tasks: Task[] = [
    new Task(1, 'Faire les courses', 'Acheter des ingrédients pour le dîner', new Date(), new Date(), 'medium', 1),
    new Task(2, 'Répondre aux emails', 'Répondre aux emails professionnels', new Date(), new Date(), 'high', 2)
  ];

  constructor() { }
  getAllTasks(): Task[] {
    return this.tasks;
  }
  getTaskById(id: number): Task | undefined {
    return this.tasks.find(task => task.getId() === id);
  }
}