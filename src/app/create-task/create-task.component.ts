import { Component, EventEmitter, Output } from '@angular/core';
import { Task } from '../shared/models/Task';
import { TaskService } from '../shared/services/task.service';
import { MessageService } from '../shared/services/message.service';

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
  newTaskStartTime: string = '';
  newTaskDescription: string = '';

status: boolean | undefined;
errorMessage: string = '';

  constructor(private taskService: TaskService, private messageService: MessageService) { }

  onSubmit() {
    if (this.newTaskName && this.newTaskPriority && this.newTaskDeadline && this.newTaskStartTime) {
      const validation = this.validateDates();
      if (validation !== null) {
        this.status = false;
        this.errorMessage = validation;
        return;
      }
      const id  = this.taskService.getLastId() + 1;
      const newTask = new Task(
        id,
        this.newTaskName,
        this.newTaskDescription,
        new Date(this.newTaskStartTime), 
        new Date(this.newTaskDeadline), 
        this.newTaskPriority,
        0 
      );

      this.checkTaskStatus(newTask);

      this.taskCreated.emit(newTask);
      this.taskService.addTask(newTask);
      this.resetForm();
      this.status = true;
      this.messageService.changeMessage(newTask.getName() + " a été ajoutée avec succès.");
    } else {
      this.status = false;
      this.errorMessage = "Veuillez remplir tous les champs.";
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
    this.newTaskStartTime = '';
  }

  validateDates(): string | null  {
    const startDate = new Date(this.newTaskStartTime);
    const endDate = new Date(this.newTaskDeadline);
    const now = new Date();

    if (startDate < now) {
      return "Vous ne pouvez pas ajouter une tâche dans le passe. Veuillez modifier la date de debut.";
    }

    if (endDate < startDate) {
      return "Vous ne pouvez pas finir une tâche avant de l'avoir commencer. Veuillez modifier la date d'écheance.";
    }

    return null;
  }
  checkTaskStatus(task: Task) {
    const now = new Date();
    const taskStartDate = new Date(task.getStart());

    if (taskStartDate < now) {
      task.setStatus('en cours');
    }
  }
}
