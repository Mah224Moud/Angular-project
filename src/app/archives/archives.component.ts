import { Component, OnInit } from '@angular/core';
import { Task } from '../shared/models/Task';
import { TaskService } from '../shared/services/task.service';

@Component({
  selector: 'app-archives',
  templateUrl: './archives.component.html',
  styleUrls: ['./archives.component.css']
})
export class ArchivesComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private taskService: TaskService) { }

  /**
   * Lifecycle hook that is called after data-bound properties of a directive are initialized.
   * Here it is used to set the 'tasks' property to the list of completed tasks retrieved from the task service.
   */
  ngOnInit() {
    this.tasks = this.taskService.getCompletedTasks();
  }
}