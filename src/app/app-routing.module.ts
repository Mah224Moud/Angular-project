import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { CreerTacheComponent } from './creer-tache/creer-tache.component';
import { AfficherDetailsTacheComponent } from './afficher-details-tache/afficher-details-tache.component';
import { ModificationTacheComponent } from './modification-tache/modification-tache.component';
import { SupprimerTacheComponent } from './supprimer-tache/supprimer-tache.component';


const routes: Routes = [
  {path: '', component: AccueilComponent},
  {path: 'Creer-tache', component: CreerTacheComponent},
  {path: 'Afficher-Details-Tache/:id', component: AfficherDetailsTacheComponent},
  {path: 'Modification-Tache/:id', component: ModificationTacheComponent},
  {path: 'Supprimer-Tache/:id', component: SupprimerTacheComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
