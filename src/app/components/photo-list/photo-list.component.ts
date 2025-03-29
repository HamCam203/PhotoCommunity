import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; // Ajout de HttpClientModule ici
import { CommonModule } from '@angular/common'; // Si tu utilises CommonModule
import { PhotoService, Photo } from '../../services/photo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-photo-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule], // Ajoute HttpClientModule ici aussi
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit {
  photos: Photo[] = [];

  constructor(private photoService: PhotoService,private router : Router) {}

  ngOnInit(): void {
    this.photoService.getPhotos().subscribe(data => {
      this.photos = data;
    });
  }

  // 🔥 Nouvelle méthode pour rediriger vers la page de détail
  onViewPhoto(photoId: string): void {
    this.router.navigate(['/photos', photoId]);
  }
  
  // Méthode pour snap/unSnap
  onSnapClicked(photo: Photo): void {
    this.photoService.onSnapClicked(photo).subscribe(updatedPhoto => {
      console.log('Photo mise à jour:', updatedPhoto);
    });
  }
  getAverageSnaps(): number {
    if (this.photos.length === 0) return 0;
    
    const totalSnaps = this.photos.reduce((sum, photo) => sum + photo.snaps, 0);
    return totalSnaps / this.photos.length;
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
  
  
}