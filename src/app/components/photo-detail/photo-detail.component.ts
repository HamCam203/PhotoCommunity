import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';  // Importation de Router
import { PhotoService, Photo } from '../../services/photo.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-photo-detail',
  imports: [CommonModule],
  templateUrl: './photo-detail.component.html',
  styleUrls: ['./photo-detail.component.css']
})
export class PhotoDetailComponent implements OnInit {
  photos: Photo[] = []; // Stocke toutes les photos
  photo!: Photo; // Stocke la photo actuellement affichée
  currentIndex: number = 0; // Index de la photo actuelle

  constructor(
    private route: ActivatedRoute,
    private photoService: PhotoService,
    private router: Router // Ajout de Router pour la navigation
  ) {}

  ngOnInit(): void {
    // Récupérer toutes les photos au chargement du composant
    this.photoService.getPhotos().subscribe(data => {
      this.photos = data;
      this.loadPhoto(); // Charger la photo par défaut selon l'ID
    });
  }

  // Charger la photo actuelle en fonction de l'ID passé dans l'URL
  loadPhoto(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.photo = this.photos.find(p => p.id === id)!;
      this.currentIndex = this.photos.indexOf(this.photo);
    }
  }

  // Fonction pour afficher la photo précédente
  previousPhoto(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.photo = this.photos[this.currentIndex];
      this.router.navigate(['/photo', this.photo.id]); // Met à jour l'URL
    }
  }

  // Fonction pour afficher la photo suivante
  nextPhoto(): void {
    if (this.currentIndex < this.photos.length - 1) {
      this.currentIndex++;
      this.photo = this.photos[this.currentIndex];
      this.router.navigate(['/photo', this.photo.id]); // Met à jour l'URL
    }
  }
  // Méthode pour snap/unSnap
  onSnapClicked(photo: Photo): void {
    this.photoService.onSnapClicked(photo).subscribe(updatedPhoto => {
      console.log('Photo mise à jour:', updatedPhoto);
    });
  }

}
