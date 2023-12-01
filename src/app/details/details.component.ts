import { Component } from '@angular/core';
import { Task } from '../shared/models/Task';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../shared/services/task.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  task?: Task;
  openDeleteModal = false;

  constructor(private route: ActivatedRoute, private taskService: TaskService) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const taskId = Number(id);
      const task = this.taskService.getTaskById(taskId);
      if (task) {
        this.task = task;
      } else {
        console.log('Task not found');
      }
    }
  }
}