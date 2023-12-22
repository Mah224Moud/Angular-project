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
  
  /**
   * Handles the click event on the task status button.
   * 
   * This method sets the selected task, updates the status of the task to 'terminée' in the TaskService, and displays a status message.
   * It also removes the task from the 'tasks' array in this component, so it no longer appears in the list of tasks to do.
   *
   * @param {Task} task - The task whose status button was clicked.
   */
  onTaskStatusClick(task: Task) {
    this.selectedTask = task;
    this.taskService.updateTaskStatus(task.getId(), "terminée", true);
    this.messageService.changeStatusMessage(task.getName() + ' a été marquée comme terminée.');
    this.tasks = this.tasks.filter(t => t.getId() !== task.getId());
  }

  /**
   * Sorts the 'tasks' array by end date.
   * 
   * This method uses the JavaScript Array sort method to sort the tasks in ascending order of their end dates.
   * It converts the end dates of the tasks to Date objects and compares their time values to determine the sort order.
   */
  sortDate(){
    this.tasks.sort((a, b) => {
      const dateA = new Date(a.getEndDateObject());
      const dateB = new Date(b.getEndDateObject());
      return dateA.getTime() - dateB.getTime();
     
    });
  }

  /**
   * Sorts the 'tasks' array by priority.
   * 
   * This method uses the JavaScript Array sort method to sort the tasks in ascending order of their priorities.
   * It uses an array of priorities in the order 'élevée', 'moyenne', 'faible', and compares the indices of the tasks' priorities in this array to determine the sort order.
   */
  sortPriority(){
    this.tasks.sort((a, b) => {
      const priorities = [ 'élevée', 'moyenne', 'faible'];
      return priorities.indexOf(a.getPriority()) - priorities.indexOf(b.getPriority());
    });
  }

  /**
   * Sorts the 'tasks' array by status.
   * 
   * This method uses the JavaScript Array sort method to sort the tasks in the order 'en cours', 'à faire'.
   * It uses an array of statuses in this order, and compares the indices of the tasks' statuses in this array to determine the sort order.
   */
  sortSatut(){ 
    this.tasks.sort((a, b) => {
      const status = [ 'en cours', 'à faire'];
      return status.indexOf(a.getStatus()) - status.indexOf(b.getStatus());
    });
  }

  /**
   * Handles the change event on the sort select element.
   * 
   * This method retrieves the selected sort option from the event object, and calls the corresponding sort method.
   * If the selected option is 'date', it calls 'sortDate'.
   * If the selected option is 'priority', it calls 'sortPriority'.
   * If the selected option is 'status', it calls 'sortStatus'.
   * If no option is selected, it defaults to 'sortDate'.
   *
   * @param {any} event - The event object from the change event.
   */
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