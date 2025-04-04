import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PhotoService, Photo } from '../../services/photo.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-photo-detail',
  imports: [CommonModule],
  templateUrl: './photo-detail.component.html',
  styleUrls: ['./photo-detail.component.css']
})
export class PhotoDetailComponent implements OnInit {
  photos: Photo[] = [];
  photo!: Photo;
  currentIndex: number = 0;

  constructor(
    private route: ActivatedRoute,
    private photoService: PhotoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.photoService.getPhotos().subscribe(data => {
      this.photos = data;
      this.loadPhoto();
    });
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

  loadPhoto(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.photo = this.photos.find(p => p.id === id)!;
      this.currentIndex = this.photos.indexOf(this.photo);
    }
  }

  previousPhoto(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.photos.length - 1;
    }

    this.photo = this.photos[this.currentIndex];
    this.router.navigate(['/photo', this.photo.id]);
  }

  nextPhoto(): void {
    if (this.currentIndex < this.photos.length - 1) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0;
    }

    this.photo = this.photos[this.currentIndex];
    this.router.navigate(['/photo', this.photo.id]);
  }

  randomPhoto(): void {
    if (this.photos.length > 1) {
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * this.photos.length);
      } while (randomIndex === this.currentIndex);

      this.currentIndex = randomIndex;
      this.photo = this.photos[this.currentIndex];
      this.router.navigate(['/photo', this.photo.id]);
    }
  }

  onSnapClicked(photo: Photo): void {
    this.photoService.onSnapClicked(photo).subscribe(updatedPhoto => {
      console.log('Photo mise à jour:', updatedPhoto);
    });
  }
  
  // Nouvelle méthode pour supprimer une photo
  deletePhoto(): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette photo ?')) {
      this.photoService.deletePhoto(this.photo.id).subscribe({
        next: () => {
          console.log('Photo supprimée avec succès');
          this.router.navigate(['/photos']);
        },
        error: (err) => {
          console.error('Erreur lors de la suppression de la photo:', err);
        }
      });
    }
  }
}