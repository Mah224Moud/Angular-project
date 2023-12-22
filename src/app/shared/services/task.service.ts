import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../models/Task';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  tasks: Task[] = [];
  private tasksUpdatedSource = new Subject<Task[]>();
  public tasksUpdated$ = this.tasksUpdatedSource.asObservable();

  /**
   * Constructor for the TaskService.
   * 
   * It injects the HttpClient and calls the 'loadTasks' method to load all tasks from the server.
   * 
   * @param {HttpClient} http - The HttpClient to use for making HTTP requests.
   * @returns {void}
   */
  constructor(private http: HttpClient) {
    this.loadTasks();
  }

  /**
   * Loads tasks from local storage or from the server.
   * 
   * This method first checks if there are any tasks saved in local storage. If there are, it loads them and converts them into Task objects.
   * If there are no tasks in local storage, it sends a GET request to the server to fetch the tasks, then saves them to local storage.
   * 
   * @returns {void}
   */
  loadTasks() {
    if (localStorage.getItem('tasks')) {
      this.tasks = JSON.parse(localStorage.getItem('tasks') || '[]').map((task: any) => new Task(
        task.id,
        task.name, 
        task.description,
        new Date(task.start), 
        new Date(task.end), 
        task.priority,
        task.level));
    } else {
      this.http.get<Task[]>('assets/data/tasks.json').subscribe(data => {
        this.tasks = data;
        this.saveTasks();
      });
    }
  }

  /**
   * Saves the current tasks to local storage.
   * 
   * This method is typically called after a task is added, deleted, or updated. It converts the 'tasks' array into a JSON string and saves it to local storage.
   * 
   * @returns {void}
   */
  saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  /**
   * Retrieves all tasks that are not completed.
   * 
   * This method first checks and updates the status of each task in the 'tasks' array.
   * Then, it filters out the tasks that are completed ('terminée') and returns the remaining tasks.
   *
   * @returns {Task[]} - An array of tasks that are not completed.
   */
  getAllTasks(): Task[] {
    this.tasks.forEach(task => {
      this.checkAndUpdateTaskStatus(task);
    });

    return this.tasks.filter(task => task.getStatus() !== 'terminée');
  }

  /**
   * Retrieves all completed tasks.
   * 
   * This method filters the 'tasks' array and returns only the tasks that have a status of 'terminée'.
   *
   * @returns {Task[]} - An array of completed tasks.
   */
  getCompletedTasks(): Task[] {
    return this.tasks.filter(task => task.getStatus() === 'terminée');
  }
  

  /**
   * Retrieves a task by its ID.
   * 
   * This method searches the 'tasks' array for a task with the provided ID. If found, it returns the task. If not, it returns undefined.
   *
   * @param {number} id - The ID of the task to retrieve.
   * @returns {Task | undefined} - The task with the provided ID, or undefined if no such task is found.
   */
  getTaskById(id: number): Task | undefined {
    return this.tasks.find(task => task.getId() === id);
  }

  /**
   * Updates a task with the provided ID.
   * 
   * This method searches the 'tasks' array for a task with the provided ID. If found, it updates the task's properties with the properties of the 'updatedTask' object.
   * After updating the task, it saves the current tasks to local storage.
   *
   * @param {number} id - The ID of the task to update.
   * @param {any} updatedTask - An object containing the updated properties of the task.
   */
  updateTask(id: number, updatedTask: any) {
    const index = this.tasks.findIndex(task => task.getId() === id);
    if (index !== -1) {
      this.tasks[index].setName(updatedTask.name);
      this.tasks[index].setPriority(updatedTask.priority);
      this.tasks[index].setStatus(updatedTask.status);
      this.tasks[index].setEnd(updatedTask.end);
      this.tasks[index].setStart(updatedTask.start);
      this.tasks[index].setDescription(updatedTask.description);
      this.saveTasks();
    }
  }

  /**
   * Updates the status of a task with the provided ID.
   * 
   * This method searches the 'tasks' array for a task with the provided ID. If found, it updates the task's status with the provided status.
   * If the 'done' parameter is true, it also sets the task's end date to the current date.
   * After updating the task, it saves the current tasks to local storage.
   *
   * @param {number} id - The ID of the task to update.
   * @param {string} status - The new status of the task.
   * @param {boolean} done - Whether the task is done. Defaults to false.
   */
  updateTaskStatus(id: number, status: string, done: boolean = false) {
    const index = this.tasks.findIndex(task => task.getId() === id);
    if (index !== -1) {
      this.tasks[index].setStatus(status);
      if (done) {
        this.tasks[index].setEnd(new Date());
      }
      this.saveTasks();
    }
  }

  /**
   * Adds a new task to the 'tasks' array.
   * 
   * This method pushes the new task to the 'tasks' array, then emits the updated tasks array to all subscribers of 'tasksUpdatedSource'.
   * After adding the task, it saves the current tasks to local storage.
   *
   * @param {Task} newTask - The new task to add.
   */
  addTask(newTask: Task) {
    this.tasks.push(newTask);
    this.tasksUpdatedSource.next(this.getAllTasks());
    this.saveTasks();
  }

  /**
   * Retrieves the ID of the last task in the 'tasks' array.
   * 
   * This method is typically called when a new task is created and needs to be assigned a unique ID.
   * If there are no tasks in the array, it returns 0.
   *
   * @returns {number} - The ID of the last task in the 'tasks' array, or 0 if there are no tasks.
   */
  getLastId(): number {
    return this.tasks.length > 0 ? this.tasks[this.tasks.length - 1].getId() : 0;
  }

  /**
   * Deletes a task with the provided ID from the 'tasks' array.
   * 
   * This method searches the 'tasks' array for a task with the provided ID. If found, it removes the task from the array.
   * After deleting the task, it saves the current tasks to local storage.
   *
   * @param {number} id - The ID of the task to delete.
   */
  deleteTask(id: number) {
    const index = this.tasks.findIndex(task => task.getId() === id);
    if (index !== -1) {
      this.tasks.splice(index, 1);
      this.saveTasks();
    }
  }

  /**
   * Checks and updates the status of a task based on its start and end dates.
   * 
   * This method compares the start and end dates of the task with the current date.
   * If the end date is in the past, it sets the task status to 'terminée'.
   * If the start date is in the past or today, and the end date is in the future, it sets the task status to 'en cours'.
   * If the start date is in the future, it sets the task status to 'à faire'.
   *
   * @param {Task} task - The task whose status needs to be checked and updated.
   */
  checkAndUpdateTaskStatus(task: Task) {
    const now = new Date();
    const taskStartDate = task.getStartDateObject();
    const taskEndDate = task.getEndDateObject();

    if (taskEndDate < now) {
      this.updateTaskStatus(task.getId(), 'terminée');
    } else if (taskStartDate <= now && taskEndDate > now) {
      this.updateTaskStatus(task.getId(), 'en cours');
    } else if (taskStartDate > now) {
      this.updateTaskStatus(task.getId(), 'à faire');
    }
  }
}