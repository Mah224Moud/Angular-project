import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ArchivesComponent } from './archives/archives.component';
import { DetailsComponent } from './details/details.component';
import { UpdateTaskComponent } from './update-task/update-task.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'archives', component: ArchivesComponent },
  { path: 'details/:id', component: DetailsComponent },
  { path: 'update-task/:id', component: UpdateTaskComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
