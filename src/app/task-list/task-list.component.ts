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
    this.taskService.updateTaskStatus(task.getId(), "terminée", true);
    this.messageService.changeStatusMessage(task.getName() + ' a été marquée comme terminée.');
    this.tasks = this.tasks.filter(t => t.getId() !== task.getId());
  }

  sortDate(){
    this.tasks.sort((a, b) => {
      const dateA = new Date(a.getEndDateObject());
      const dateB = new Date(b.getEndDateObject());
      return dateA.getTime() - dateB.getTime();
     
    });
  }

  sortPriority(){
    this.tasks.sort((a, b) => {
      const priorities = [ 'élevée', 'moyenne', 'faible'];
      return priorities.indexOf(a.getPriority()) - priorities.indexOf(b.getPriority());
    });
  }

  sortSatut(){ 
    this.tasks.sort((a, b) => {
      const status = [ 'en cours', 'à faire'];
      return status.indexOf(a.getStatus()) - status.indexOf(b.getStatus());
    });
  }

  onSortChange(event: any) {
    const value = event.target.value;
    switch(value) {
      case 'date':
        this.sortDate();
        break;
      case 'priority':
        this.sortPriority();
        break;
      case 'status':
        this.sortSatut();
        break;
      default:
        this.sortDate();
        break;
    }
  }

}