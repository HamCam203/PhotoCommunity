import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PhotoService, Photo } from '../../services/photo.service';

@Component({
  selector: 'app-photo-create',
  standalone: true,
  templateUrl: './photo-create.component.html',
  styleUrls: ['./photo-create.component.scss'],
  imports: [
    CommonModule,          // Pour *ngIf, *ngFor, etc.
    ReactiveFormsModule,    // Pour formGroup, formControlName, etc.
    FormsModule
  ]
})
export class PhotoCreateComponent {
  photoForm: FormGroup;
  imageSource: string = 'url';  // Pour savoir si l'utilisateur a sélectionné URL ou Upload
  selectedImageBase64: string | null = null;  // Contiendra l'image en base64
  imageError: string | null = null;  // Pour afficher une erreur si l'image est invalide

  constructor(private fb: FormBuilder, private photoService: PhotoService, private router: Router) {
    this.photoForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      imageUrl: ['', [Validators.required, Validators.pattern(/^(http|https):\/\/[^\s$.?#].[^\s]*$/)]]
    });
  }

  onSubmit(): void {
    const form = this.photoForm.value;

    // Validation dynamique
    if (this.photoForm.valid && (this.imageSource === 'url' || this.selectedImageBase64)) {
      const newPhoto = {
        title: form.title,
        description: form.description,
        imageUrl: this.imageSource === 'url' ? form.imageUrl : null,
        imageBase64: this.imageSource === 'upload' ? this.selectedImageBase64 : null,
        snaps: 0,
        isSnapped: false
      };

      this.photoService.createPhoto(newPhoto).subscribe(() => {
        this.router.navigate(['/photos']);
      });
    } else {
      this.imageError = 'Veuillez fournir une image valide.';
    }
  }

  // Fonction pour gérer l'événement de sélection de fichier
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    const file = input.files[0];

    // Vérification que le fichier est bien une image
    if (!file.type.startsWith('image/')) {
      this.imageError = 'Veuillez sélectionner une image valide.';
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      // Une fois l'image chargée, la convertir en base64
      this.selectedImageBase64 = reader.result as string;
      this.imageError = null;  // Réinitialiser l'erreur
    };
    reader.readAsDataURL(file); // Convertir l'image en base64
  }
}
