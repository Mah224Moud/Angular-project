import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Task } from '../shared/models/Task';
import { TaskService } from '../shared/services/task.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.css']
})
export class UpdateTaskComponent {
  task: Task | undefined;
  taskName: string | undefined;
  taskDescription: string | undefined;
  taskEnd: string | undefined;
  taskPriority: string | undefined;
  taskStatus: string | undefined;
  taskStart: string | undefined;

  constructor(private route: ActivatedRoute, private taskService: TaskService) { }

  /**
   * Lifecycle hook that is called after data-bound properties of a directive are initialized.
   * 
   * In this case, it retrieves the task ID from the route parameters, and uses it to fetch the corresponding task from the task service.
   * If the task is found, it assigns the task's properties to the corresponding properties in this component.
   * If the task is not found, it logs a message to the console.
   */
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.task = this.taskService.getTaskById(Number(id));
      if (this.task) {
        this.taskName = this.task.getName();
        this.taskDescription = this.task.getDescription();
        this.taskPriority = this.task.getPriority();
        this.taskEnd = this.task.getEndDateObject().toISOString().substring(0, 16);
        this.taskStart = this.task.getStartDateObject().toISOString().substring(0, 16);
        this.taskStatus = this.task.getStatus();
      } else {
        console.log('Task not found');
      }
    }
  }

  updateMessage = '';
  status : boolean | undefined;

  /**
   * Handles the submit event of the task update form.
   * 
   * This method first checks if the form is valid and if all required fields are filled.
   * If they are, it checks if the end date of the task is in the future. If it is, it calls the 'updateTask' method of the TaskService to update the task, and sets a success message.
   * If the end date is in the past, it sets an error message.
   * If the form is not valid or not all required fields are filled, it sets an error message.
   *
   * @param {NgForm} form - The form object from the submit event.
   */
  onSubmit(form: NgForm) {
    const now = new Date();
    let endDate;

    if (this.taskEnd) {
      endDate = new Date(this.taskEnd);
    }

    if (form.valid && this.task && this.taskEnd && this.taskStart && endDate) {
      if (endDate >= now) {
        this.taskService.updateTask(this.task.getId(), {
          name: this.taskName,
          priority: this.taskPriority,
          end: endDate,
          start: new Date(this.taskStart),
          description: this.taskDescription
        });
        this.status = true;
        this.updateMessage = 'La tâche a été mise à jour avec succès.';
      } else {
        this.status = false;
        this.updateMessage = 'La date de fin est passée. Veuillez choisir une date future.';
      }
    } else {
      this.status = false;
      this.updateMessage = 'Veuillez remplir tous les champs.';
    }
  }

  /**
   * Closes the status alert.
   * 
   * This method is typically called when the user clicks the close button on the status alert. It sets the 'status' property to undefined, which hides the alert.
   */
  closeAlert() {
    this.status = undefined;
  }
}
