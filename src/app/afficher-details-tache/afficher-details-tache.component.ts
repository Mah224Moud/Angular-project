import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-afficher-details-tache',
  templateUrl: './afficher-details-tache.component.html',
  styleUrls: ['./afficher-details-tache.component.css']
})


export class AfficherDetailsTacheComponent implements OnInit {
  taskDetails: any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Simuler des données de tâche (remplacez cela par votre logique de récupération de données)
    this.taskDetails = {
      name: "Acheter des courses",
      creationDate: "2023-11-22",
      dueDate: "2023-12-01",
      description: "Acheter des fruits, légumes et produits laitiers.",
      priority: "Haute",
      status: "En cours"
    };
  }

  markAsDone() {
    this.taskDetails.status = "Terminée";
  }
}

