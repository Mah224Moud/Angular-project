import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private messageSource = new BehaviorSubject<string>('');
  private statusMessage = new BehaviorSubject<string>('');

  currentMessage = this.messageSource.asObservable();
  currentStatusMessage = this.statusMessage.asObservable();

  changeMessage(message: string) {
    this.messageSource.next(message);
  }

  changeStatusMessage(statusMessage: string) {
    this.statusMessage.next(statusMessage);
  }
}