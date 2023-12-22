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

  /**
   * Constructor for the HomeComponent.
   * 
   * It injects the TaskService and MessageService, and initializes the 'tasks' property with all tasks retrieved from the TaskService.
   */
  constructor(private taskService: TaskService, private messageService: MessageService) {
    this.tasks = this.taskService.getAllTasks();
  }

  /**
   * Lifecycle hook that is called after data-bound properties of a directive are initialized.
   * 
   * In this case, it subscribes to updates from the TaskService and MessageService.
   * When the tasks are updated in the TaskService, it updates the 'tasks' property.
   * When a new message is received from the MessageService, it updates the 'message' property and resets the message after a certain time.
   * Similarly, when a new status message is received, it updates the 'statusMessage' property and resets the status message after a certain time.
   */
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

  /**
   * Adds a new task to the 'tasks' array.
   * 
   * This method is typically called when a new task is created in the child component and emitted to this parent component.
   *
   * @param {Task} newTask - The new task to add.
   * @returns {void}
   */
  onTaskCreated(newTask: Task) {
    this.tasks.push(newTask);
  }

  /**
   * Resets the status message.
   * 
   * This method is typically called when the user closes the status message. It calls the MessageService to reset the status message.
   */
  closeStatusMessage() {
    this.messageService.resetStatusMessage();
  }

  /**
   * Resets the status message.
   * 
   * This method is typically called when the user closes the status message. It calls the MessageService to reset the status message.
   * 
   * @returns {void}
   */
  closeMessage() {
    this.messageService.resetMessage();
  }
}