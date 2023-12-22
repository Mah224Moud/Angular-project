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

  /**
   * This method is triggered when the form is submitted. 
   * It validates the form inputs and creates a new task if the inputs are valid.
   * The new task is then emitted to the parent component and added to the task service.
   * If the form inputs are not valid, it sets an error message.
   */
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
        this.newTaskPriority 
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

  /**
   * Closes the alert by setting the status to undefined.
   *
   * @returns {void}
   */
  closeAlert() {
    this.status = undefined;
  }

  /**
   * Resets all the form fields to their initial values.
   * Typically called after a successful form submission.
   *
   * @returns {void}
   */
  resetForm() {
    this.newTaskName = '';
    this.newTaskPriority = 'faible';
    this.newTaskDeadline = '';
    this.newTaskDescription = '';
    this.newTaskStartTime = '';
  }

  /**
   * Validates the start and end dates of the task.
   * 
   * This method checks if the start date is in the past, and if the end date is before the start date.
   * If the start date is in the past, it returns an error message indicating that a task cannot be added in the past.
   * If the end date is before the start date, it returns an error message indicating that a task cannot end before it starts.
   * If both dates are valid, it returns null.
   *
   * @returns {string | null} - Returns a string if there is an error, null otherwise.
   */
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

  /**
   * Checks the status of a task based on its start date.
   * 
   * This method compares the start date of the task with the current date.
   * If the start date is in the past, it sets the task status to 'en cours'.
   *
   * @param {Task} task - The task to check.
   * @returns {void}
   */
  checkTaskStatus(task: Task) {
    const now = new Date();
    const taskStartDate = new Date(task.getStart());

    if (taskStartDate < now) {
      task.setStatus('en cours');
    }
  }
}
