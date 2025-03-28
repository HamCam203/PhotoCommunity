import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export interface Photo {
  isSnapped: boolean;
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

  // Mettre à jour une photo (ajout ou retrait d'un like)
  updatePhoto(photo: Photo): Observable<Photo> {
    const updateUrl = `${this.apiUrl}/${photo.id}`;
    const updateData = {
      snaps: photo.snaps, // On envoie uniquement le nombre de snaps mis à jour
      isSnapped: photo.isSnapped // Indique si la photo est likée ou pas
    };

    return this.http.put<Photo>(updateUrl, updateData).pipe(
      tap(updatedPhoto => console.log('Photo mise à jour:', updatedPhoto))
    );
  }
  // Nouvelle méthode pour récupérer une photo par son ID
  getPhotoById(id: string): Observable<Photo> {
    const photoUrl = `${this.apiUrl}/${id}`;
    return this.http.get<Photo>(photoUrl).pipe(
      tap(photo => console.log('Photo récupérée:', photo))
    );
  }


  // Méthode partagée pour l'action Snap (ajout/retrait de like)
  onSnapClicked(photo: Photo): Observable<Photo> {
    if (photo.isSnapped) {
      photo.snaps -= 1;  // Réduire le nombre de snaps si déjà liké
    } else {
      photo.snaps += 1;  // Augmenter le nombre de snaps si pas encore liké
    }

    photo.isSnapped = !photo.isSnapped; // Alterner l'état de isSnapped
    
    return this.updatePhoto(photo); // Mettre à jour la photo sur le serveur
  }
  

}
