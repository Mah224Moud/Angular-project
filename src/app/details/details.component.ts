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

  /**
   * Lifecycle hook that is called after data-bound properties of a directive are initialized.
   * 
   * In this case, it retrieves the task ID from the route parameters, and uses it to fetch the corresponding task from the task service.
   * If the task is found, it is assigned to the 'task' property. If not, a message is logged to the console.
   */
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