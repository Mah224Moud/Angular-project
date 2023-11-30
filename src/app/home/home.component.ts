import { Component } from '@angular/core';
import { Task } from '../Task';
import { TaskService } from '../shared/services/task.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  tasks: Task[] = [];

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.tasks = this.taskService.getAllTasks();
  }
  onTaskCreated(newTask: Task) {
    this.tasks.push(newTask);
  }
}
