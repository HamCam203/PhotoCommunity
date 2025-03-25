import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export interface Photo {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  createdAt: Date | null;
  snaps: number;
}

@Injectable({
  providedIn: 'root' // Ensure the service is provided in the root injector
})
export class PhotoService {
  private apiUrl = 'http://localhost:8080/api/facesnaps'; // L'URL de ton backend Spring Boot

  constructor(private http: HttpClient) {} // Ensure HttpClient is injected

  getPhotos(): Observable<Photo[]> {
    return this.http.get<Photo[]>(this.apiUrl).pipe(
      tap(data => console.log(data)) // Parenthèse fermée correctement ici
    );
  }
  // Mettre à jour une photo
  updatePhoto(photo: Photo): Observable<Photo> {
    const updateUrl = `${this.apiUrl}/${photo.id}`; // URL de l'API pour mettre à jour la photo
    return this.http.put<Photo>(updateUrl, photo).pipe(
      tap(updatedPhoto => console.log('Photo mise à jour:', updatedPhoto))
    );
  }
}
