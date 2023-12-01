import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateTaskComponent } from './create-task/create-task.component';
import { TaskListComponent } from './task-list/task-list.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { ArchivesComponent } from './archives/archives.component';
import { HighlightRowDirective } from './shared/directives/highlight-row.directive';
import { DetailsComponent } from './details/details.component';
import { UpdateTaskComponent } from './update-task/update-task.component';
import { DeleteTaskComponent } from './delete-task/delete-task.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    CreateTaskComponent,
    TaskListComponent,
    HomeComponent,
    HeaderComponent,
    ArchivesComponent,
    HighlightRowDirective,
    DetailsComponent,
    UpdateTaskComponent,
    DeleteTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
