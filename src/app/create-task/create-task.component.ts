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
  newTaskDescription: string = '';

status: boolean | undefined;
errorMessage: string = '';

  constructor(private taskService: TaskService, private messageService: MessageService) { }

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
  }
}
