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

  ngOnChanges() {
    if (this.open) {
      this.openModal();
    }
  }

  openModal() {
    this.openDeleteModal = true;
  }

  closeModal() {
    this.openDeleteModal = false;
    this.closed.emit();
  }
  deleteTask() {
    if (this.task) {
      this.taskService.deleteTask(this.task.getId());
      this.messageService.changeMessage('La tâche a été supprimée avec succès.');
    }
    this.closeModal();
    this.router.navigate(['/home']);
  }
}