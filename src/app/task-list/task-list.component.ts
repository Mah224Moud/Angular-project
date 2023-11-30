import { Component, Input, ViewChild } from '@angular/core';
import { Task } from '../Task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent {
  @Input() tasks: Task[] = [];
  selectedTask!: Task;
  
  onTaskClick(task: Task) {
    this.selectedTask = task;
  }
}