import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; // Ajout de HttpClientModule ici
import { CommonModule } from '@angular/common'; // Si tu utilises CommonModule
import { PhotoService, Photo } from '../../services/photo.service';

@Component({
  selector: 'app-photo-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule], // Ajoute HttpClientModule ici aussi
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit {
  photos: Photo[] = [];

  constructor(private photoService: PhotoService) {}

  ngOnInit(): void {
    this.photoService.getPhotos().subscribe(data => {
      this.photos = data;
    });
  }

  // Méthode appelée quand un utilisateur clique sur le bouton Snap
  onSnapClicked(photo: Photo): void {
    if (photo.isSnapped) {
      photo.snaps -= 1; // Réduire le nombre de snaps si déjà liké
    } else {
      photo.snaps += 1; // Augmenter le nombre de snaps si pas encore liké
    }
  
    photo.isSnapped = !photo.isSnapped; // Alterner l'état de isSnapped
  
    // Mettre à jour la base de données
    this.photoService.updatePhoto(photo).subscribe(updatedPhoto => {
      console.log('Photo mise à jour:', updatedPhoto);
    });
  }
  
  
}