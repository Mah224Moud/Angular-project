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

  constructor(private taskService: TaskService, private messageService: MessageService) { }

  ngOnInit() {
    this.tasks = this.taskService.getAllTasks();
    this.messageService.currentMessage.subscribe(message => this.message = message);
    this.messageService.currentStatusMessage.subscribe(statusMessage => this.statusMessage = statusMessage);
  }
  onTaskCreated(newTask: Task) {
    this.tasks.push(newTask);
  }
}