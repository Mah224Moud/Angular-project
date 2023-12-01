import { Component, EventEmitter, Output } from '@angular/core';
import { Task } from '../shared/models/Task';
import { TaskService } from '../shared/services/task.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent {
  @Output() taskCreated = new EventEmitter<Task>();
  newTaskName: string = '';
  newTaskPriority: string = 'faible';
  newTaskDeadline: string = '';
  newTaskDescription: string = '';


  status: boolean | undefined;
  message: string = '';

  constructor(private taskService: TaskService) { }

  onSubmit() {
    if (this.newTaskName && this.newTaskPriority && this.newTaskDeadline) {
      const id  = this.taskService.getLastId() + 1;
      const newTask = new Task(
        id,
        this.newTaskName,
        this.newTaskDescription,
        new Date(), 
        new Date(this.newTaskDeadline), 
        this.newTaskPriority,
        0 
      );

      this.taskCreated.emit(newTask);
      this.taskService.addTask(newTask);
      this.resetForm();
      this.status = true;
      this.message = 'La tâche a été créée avec succès.';
    } else {
      this.status = false;
      this.message = 'Veuillez remplir tous les champs.';
    }
  }

  closeAlert() {
    this.status = undefined;
  }

  resetForm() {
    this.newTaskName = '';
    this.newTaskPriority = 'faible';
    this.newTaskDeadline = '';
    this.newTaskDescription = '';
  }
}
