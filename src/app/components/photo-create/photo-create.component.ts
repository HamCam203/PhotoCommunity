import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PhotoService, Photo } from '../../services/photo.service';

@Component({
  selector: 'app-photo-create',
  standalone: true,
  templateUrl: './photo-create.component.html',
  styleUrls: ['./photo-create.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class PhotoCreateComponent {
  photoForm: FormGroup;
  imageSource: string = 'url';
  selectedImageBase64: string | null = null;
  imageError: string | null = null;

  constructor(private fb: FormBuilder, private photoService: PhotoService, private router: Router) {
    this.photoForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      imageUrl: ['']
    });

    // On met à jour la validation en fonction de la source d'image
    this.updateValidation();
  }

  // Méthode pour mettre à jour les validations selon la source d'image
  updateValidation(): void {
    const imageUrlControl = this.photoForm.get('imageUrl');
    
    if (this.imageSource === 'url') {
      imageUrlControl?.setValidators([
        Validators.required, 
        Validators.pattern(/^(http|https):\/\/[^\s$.?#].[^\s]*$/)
      ]);
    } else {
      imageUrlControl?.clearValidators();
    }
    
    imageUrlControl?.updateValueAndValidity();
  }

  // Méthode appelée lorsque l'utilisateur change la source d'image
  onImageSourceChange(): void {
    this.updateValidation();
    this.selectedImageBase64 = null;
    this.imageError = null;
  }

  onSubmit(): void {
    // Vérifier si le formulaire est valide
    if (!this.photoForm.valid) {
      this.photoForm.markAllAsTouched();
      return;
    }
    
    // Vérifier si l'image est fournie
    if (this.imageSource === 'upload' && !this.selectedImageBase64) {
      this.imageError = 'Veuillez sélectionner une image.';
      return;
    }

    const formValue = this.photoForm.value;
    
    // Créer l'objet photo à envoyer
    const newPhoto: Partial<Photo> = {
      title: formValue.title,
      description: formValue.description,
      imageUrl: this.imageSource === 'url' ? formValue.imageUrl : '',
      imageBase64: this.imageSource === 'upload' ? this.selectedImageBase64 : null,
      snaps: 0,
      isSnapped: false
    };

    // Envoyer la photo au service
    this.photoService.createPhoto(newPhoto).subscribe({
      next: () => {
        this.router.navigate(['/photos']);
      },
      error: (error) => {
        console.error('Erreur lors de la création de la photo:', error);
        this.imageError = 'Une erreur est survenue lors de la création de la photo.';
      }
    });
  }

  // Fonction pour gérer l'événement de sélection de fichier
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) {
      this.selectedImageBase64 = null;
      this.imageError = null;
      return;
    }

    const file = input.files[0];

    // Vérification de la taille du fichier (max 5 MB)
    if (file.size > 5 * 1024 * 1024) {
      this.imageError = 'L\'image doit faire moins de 5 MB.';
      this.selectedImageBase64 = null;
      return;
    }

    // Vérification du type de fichier
    if (!file.type.startsWith('image/')) {
      this.imageError = 'Veuillez sélectionner une image valide.';
      this.selectedImageBase64 = null;
      return;
    }

    // Lecture et conversion en base64
    const reader = new FileReader();
    reader.onload = () => {
      this.selectedImageBase64 = reader.result as string;
      this.imageError = null;
    };
    reader.onerror = () => {
      this.imageError = 'Erreur lors de la lecture du fichier.';
      this.selectedImageBase64 = null;
    };
    reader.readAsDataURL(file);
  }
}