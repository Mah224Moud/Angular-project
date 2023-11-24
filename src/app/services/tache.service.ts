import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class TacheService {private apiUrl = 'https://votre-api.com/taches'; // Remplacez ceci par l'URL de votre API

constructor(private http: HttpClient) { }

creerTache(tache: any): Observable<any> {
  return this.http.post(`${this.apiUrl}/creer`, tache);
}
}
