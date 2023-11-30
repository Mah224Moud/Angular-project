import { Component, EventEmitter, Output } from '@angular/core';
import { Task } from '../Task';

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
  newTaskDescription: string = '';
  id = 3;


  onSubmit() {
    const newTask = new Task(
      this.id++,
      this.newTaskName,
      this.newTaskDescription,
      new Date(), 
      new Date(this.newTaskDeadline), 
      this.newTaskPriority,
      0 
    );

    
    this.taskCreated.emit(newTask);

    this.resetForm();
  }

  resetForm() {
    this.newTaskName = '';
    this.newTaskPriority = 'faible';
    this.newTaskDeadline = '';
    this.newTaskDescription = '';
  }
}
