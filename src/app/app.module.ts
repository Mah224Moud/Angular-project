import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TachesService } from './services/taches.service';
import { AccueilComponent } from './accueil/accueil.component';
import { ModificationTacheComponent } from './modification-tache/modification-tache.component';
import { SupprimerTacheComponent } from './supprimer-tache/supprimer-tache.component';
import { AfficherDetailsTacheComponent } from './afficher-details-tache/afficher-details-tache.component';
import { CreerTacheComponent } from './creer-tache/creer-tache.component';
import { HeaderComponent } from './header/header.component';
import { ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    CreerTacheComponent,
    AfficherDetailsTacheComponent,
    ModificationTacheComponent,
    SupprimerTacheComponent,
    HeaderComponent,
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [TachesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
