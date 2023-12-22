import { Component, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { MessageService } from '../shared/services/message.service';
import { Task } from '../shared/models/Task';
import { TaskService } from '../shared/services/task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-task',
  templateUrl: './delete-task.component.html',
  styleUrls: ['./delete-task.component.css']
})

export class DeleteTaskComponent implements OnChanges {
  @Input() task: Task | undefined;
  @Input() open: boolean | undefined;
  @Output() closed = new EventEmitter<void>();
  openDeleteModal = false;

  constructor(private taskService: TaskService, private router: Router, private messageService: MessageService) { }

  /**
   * Lifecycle hook that is called when any data-bound property of a directive changes.
   * 
   * In this case, it checks if the 'open' property is true, and if so, it opens the modal.
   */
  ngOnChanges() {
    if (this.open) {
      this.openModal();
    }
  }

  /**
   * Opens the deletion confirmation modal.
   * 
   * This method is typically called when the user clicks on the 'Delete' button.
   */
  openModal() {
    this.openDeleteModal = true;
  }

  /**
   * Closes the modal and emits a 'closed' event.
   * 
   * This method is typically called when the user clicks on the 'Cancel' button or after a successful deletion operation.
   */
  closeModal() {
    this.openDeleteModal = false;
    this.closed.emit();
  }

  /**
   * Deletes the selected task.
   * 
   * This method calls the task service to delete the task, then updates the message service with a success message.
   * It also closes the modal and navigates back to the home page.
   */
  deleteTask() {
    if (this.task) {
      this.taskService.deleteTask(this.task.getId());
      this.messageService.changeMessage('La tâche a été supprimée avec succès.');
    }
    this.closeModal();
    this.router.navigate(['/home']);
  }
}