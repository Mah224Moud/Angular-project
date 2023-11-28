import { Component } from '@angular/core';
import { Task } from './Task';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'GesTaches';
  tasks: Task[] = [
    new Task(1, 'Faire les courses', 'Acheter des ingrédients pour le dîner', new Date(), new Date(), 'medium', 1),
    new Task(2, 'Répondre aux emails', 'Répondre aux emails professionnels', new Date(), new Date(), 'high', 2)
  ];
}
