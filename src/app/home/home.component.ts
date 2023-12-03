import { Component } from '@angular/core';
import { Task } from '../shared/models/Task';
import { MessageService } from '../shared/services/message.service';
import { TaskService } from '../shared/services/task.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  tasks: Task[] = [];
  message : string = '';
  statusMessage: string = '';
  TIME: number = 5000;

  constructor(private taskService: TaskService, private messageService: MessageService) {
    this.tasks = this.taskService.getAllTasks();
   }

  ngOnInit() {
    this.taskService.tasksUpdated$.subscribe(tasks => {
      this.tasks = tasks;
    });

    this.messageService.currentMessage.subscribe(message => {
      this.message = message;
      if (message) {
        setTimeout(() => {
          this.messageService.resetMessage();
        }, this.TIME);
      }
    });

    this.messageService.currentStatusMessage.subscribe(statusMessage => {
      this.statusMessage = statusMessage;
      if (statusMessage) {
        setTimeout(() => {
          this.messageService.resetStatusMessage();
        }, this.TIME);
      }
    });
  }
  onTaskCreated(newTask: Task) {
    this.tasks.push(newTask);
  }

  closeStatusMessage() {
    this.messageService.resetStatusMessage();
  }

  closeMessage() {
    this.messageService.resetMessage();
  }
}