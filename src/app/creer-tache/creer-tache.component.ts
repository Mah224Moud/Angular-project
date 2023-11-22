import { Component } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { TacheService} from '../services/tache.service';
import { ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-creer-tache',
  templateUrl: './creer-tache.component.html',
  styleUrls: ['./creer-tache.component.css']
})
export class CreerTacheComponent {
  tacheForm:FormGroup;
  tacheService:any

  constructor(private formBuilder:FormBuilder,private tacheservice:TacheService ,) { 
  this.tacheForm =this.formBuilder.group({
  intitule:['',Validators.required],
  dateDecreation:['',Validators.required],
  dateEcheance:['',Validators.required],
  priorite:['',Validators.required],
  description:[''],

});
}
creerTache(){
  if (this.tacheForm.valid){
    this.tacheService.creerTache(this.tacheForm.value).suscribe(
      (response: any)=>{
        console.log('Tâche créée avec succès,response');
      },
      (error: any) =>{
        console.error('erreur lors de la creation de la tâche',error);
      }
      );
    } else{
      console.error('Formulaire invalide.veuillez remplir correctement tous les champs obligatoires.')
    } 

  } } 
