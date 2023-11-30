import { Component, Input, ViewChild } from '@angular/core';
import { Task } from '../Task';
import { TaskService } from '../shared/services/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent {
  @Input() tasks: Task[] = [];
  selectedTask!: Task;

  constructor(private taskService: TaskService) { }
  
  onTaskClick(task: Task) {
    this.selectedTask = task;
  }
}