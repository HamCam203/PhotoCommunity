import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { PhotoService, Photo } from '../../services/photo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-photo-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule], // Ajouter FormsModule
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit {
  photos: Photo[] = [];
  filteredPhotos: Photo[] = []; // Nouvelle propriété pour les photos filtrées
  searchTerm: string = ''; // Pour stocker le terme de recherche

  constructor(private photoService: PhotoService, private router: Router) {}

  ngOnInit(): void {
    this.photoService.getPhotos().subscribe(data => {
      this.photos = data;
      this.filteredPhotos = data; // Initialiser filteredPhotos avec toutes les photos
    });
  }

  // Méthode pour filtrer les photos en fonction du terme de recherche
  onSearchChange(): void {
    if (!this.searchTerm.trim()) {
      this.filteredPhotos = this.photos; // Si la recherche est vide, afficher toutes les photos
      return;
    }
    
    const searchTermLower = this.searchTerm.toLowerCase();
    this.filteredPhotos = this.photos.filter(photo => 
      photo.title.toLowerCase().includes(searchTermLower)
    );
  }

  // Méthode pour déterminer la source de l'image
  getImageSource(photo: Photo): string {
    // Si une image en base64 est disponible, l'utiliser
    if (photo.imageBase64) {
      return photo.imageBase64;
    }
    // Sinon, utiliser l'URL de l'image
    return photo.imageUrl;
  }

  // 🔥 Méthode pour rediriger vers la page de détail
  onViewPhoto(photoId: string): void {
    this.router.navigate(['/photos', photoId]);
  }
  
  // Méthode pour snap/unSnap
  onSnapClicked(photo: Photo): void {
    this.photoService.onSnapClicked(photo).subscribe(updatedPhoto => {
      console.log('Photo mise à jour:', updatedPhoto);
    });
  }
  
  onCreateSnap(): void {
    this.router.navigate(['/photos/create']);
  }
  
  getAverageSnaps(): number {
    if (this.filteredPhotos.length === 0) return 0;
    
    const totalSnaps = this.filteredPhotos.reduce((sum, photo) => sum + photo.snaps, 0);
    return totalSnaps / this.filteredPhotos.length;
  }
  
  // Méthode pour réinitialiser la recherche
  resetSearch(): void {
    this.searchTerm = '';
    this.filteredPhotos = this.photos;
  }
  isAboveAverage(snaps: number): boolean {
    return snaps > this.getAverageSnaps();
  }
  
  isBelowAverage(snaps: number): boolean {
    return snaps < this.getAverageSnaps();
  }
  
  isEqualAverage(snaps: number): boolean {
    return snaps === this.getAverageSnaps();
  }
  
  // Nouvelle méthode pour supprimer une photo
  deletePhoto(photoId: string, event: Event): void {
    event.stopPropagation(); // Empêche la navigation vers la page de détail
    if (confirm('Êtes-vous sûr de vouloir supprimer cette photo ?')) {
      this.photoService.deletePhoto(photoId).subscribe({
        next: () => {
          console.log('Photo supprimée avec succès');
          // Supprime la photo du tableau local pour mettre à jour l'UI immédiatement
          this.photos = this.photos.filter(photo => photo.id !== photoId);
        },
        error: (err) => {
          console.error('Erreur lors de la suppression de la photo:', err);
        }
      });
    }
  }
  // Méthode pour éditer une photo
  editPhoto(photoId: string, event: Event): void {
    event.stopPropagation(); // Empêche la navigation vers la page de détail
    this.router.navigate(['/photos/edit', photoId]);
  }
}