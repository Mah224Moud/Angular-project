import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'GesTaches';
  @ViewChild('currentYear', { static: false }) currentYear?: ElementRef;
  ngAfterViewInit() {
    if (this.currentYear) {
      this.currentYear.nativeElement.textContent = new Date().getFullYear().toString();
    }
  }
}