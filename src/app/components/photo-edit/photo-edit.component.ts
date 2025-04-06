import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PhotoService, Photo } from '../../services/photo.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-photo-edit',
  templateUrl: './photo-edit.component.html',
  styleUrls: ['./photo-edit.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class PhotoEditComponent implements OnInit {
  photoForm!: FormGroup;
  photo!: Photo;

  constructor(
    private route: ActivatedRoute,
    private photoService: PhotoService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.photoService.getPhotoById(id).subscribe(photo => {
        this.photo = photo;
        this.initForm(photo);
      });
    }
  }

  initForm(photo: Photo): void {
    this.photoForm = this.fb.group({
      title: [photo.title, Validators.required],
      description: [photo.description, Validators.required],
      imageUrl: [photo.imageUrl],
      imageBase64: [photo.imageBase64]
    });
  }

  onSubmit(): void {
    if (this.photoForm.valid) {
      const updatedPhoto: Partial<Photo> & { id: string } = {
        id: this.photo.id,
        ...this.photoForm.value
      };
  
      this.photoService.updatePhoto(updatedPhoto).subscribe({
        next: updated => {
          console.log('Mise à jour réussie !');
          this.router.navigate(['/photos', updated.id]);
        },
        error: err => console.error('Erreur lors de la mise à jour', err)
      });
    }
  }
  
}
