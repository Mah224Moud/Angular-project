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

  /**
   * Changes the current message.
   * 
   * This method is typically called when a new message needs to be displayed. It updates the 'messageSource' BehaviorSubject with the new message.
   *
   * @param {string} message - The new message to display.
   * @returns {void}
   */
  changeMessage(message: string) {
    this.messageSource.next(message);
  }

  /**
   * Changes the current status message.
   * 
   * This method is typically called when a new status message needs to be displayed. It updates the 'statusMessage' BehaviorSubject with the new status message.
   *
   * @param {string} statusMessage - The new status message to display.
   * @returns {void}
   */
  changeStatusMessage(statusMessage: string) {
    this.statusMessage.next(statusMessage);
  }

  /**
   * Resets the current status message.
   * 
   * This method is typically called when the status message needs to be cleared. It updates the 'statusMessage' BehaviorSubject with an empty string.
   * 
   * @returns {void}
   */
  resetStatusMessage() {
    this.statusMessage.next('');
  }

  /**
   * Resets the current message.
   * 
   * This method is typically called when the message needs to be cleared. It updates the 'messageSource' BehaviorSubject with an empty string.
   * 
   * @returns {void}
   */
  resetMessage() {
    this.messageSource.next('');
  }
}