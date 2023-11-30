import { Component } from '@angular/core';
import { Task } from '../Task';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../shared/services/task.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  task?: Task;

  constructor(private route: ActivatedRoute, private taskService: TaskService) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('Task ID from URL:', typeof id);
    if (id) {
      const taskId = Number(id);
      console.log('son nouveau type', typeof taskId);
      const task = this.taskService.getTaskById(taskId);
      console.log('Task from service:', task);
      if (task) {
        this.task = task;
      } else {
        console.log('Task not found');
      }
    }
  }
}