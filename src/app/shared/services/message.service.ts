import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private message = new BehaviorSubject<string>('');

  currentMessage = this.message.asObservable();

  changeMessage(message: string) {
    this.message.next(message);
  }
}