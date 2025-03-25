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
}
