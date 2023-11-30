import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Task } from '../Task';
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

  constructor(private route: ActivatedRoute, private taskService: TaskService) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.task = this.taskService.getTaskById(Number(id));
      if (this.task) {
        this.taskName = this.task.getName();
        this.taskDescription = this.task.getDescription();
        this.taskPriority = this.task.getPriority();
        this.taskEnd = this.task.getEndDateObject().toISOString().substring(0, 16);
        this.taskStatus = this.task.getStatus();
      } else {
        console.log('Task not found');
      }
    }
  }

  updateMessage = '';
  status : boolean | undefined;

  onSubmit(form: NgForm) {
    if (form.valid && this.task && this.taskEnd) {
      this.taskService.updateTask(this.task.getId(), {
        name: this.taskName,
        priority: this.taskPriority,
        status: this.taskStatus,
        end: new Date(this.taskEnd),
        description: this.taskDescription
      });
      this.status = true;
      this.updateMessage = 'La tâche a été mise à jour avec succès.';
    } else {
      this.status = false;
      this.updateMessage = 'Veuillez remplir tous les champs.';
    }
  }

  closeAlert() {
    this.status = undefined;
  }
}
