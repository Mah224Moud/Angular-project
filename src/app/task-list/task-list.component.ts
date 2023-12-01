import { Component, Input, ViewChild } from '@angular/core';
import { Task } from '../shared/models/Task';
import { TaskService } from '../shared/services/task.service';
import { Router } from '@angular/router';
import { MessageService } from '../shared/services/message.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent {
  @Input() tasks: Task[] = [];
  selectedTask!: Task;

  constructor(private taskService: TaskService, private router: Router, private messageService: MessageService) { }
  
  onTaskStatusClick(task: Task) {
    this.selectedTask = task;
    this.taskService.updateTaskStatus(task.getId(), "terminée");
    this.messageService.changeStatusMessage(task.getName() + ' a été marquée comme terminée.');
    this.tasks = this.tasks.filter(t => t.getId() !== task.getId());
  }
}