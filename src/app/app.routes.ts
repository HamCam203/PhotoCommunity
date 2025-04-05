import { Routes } from '@angular/router';
import { PhotoListComponent } from './components/photo-list/photo-list.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { PhotoDetailComponent } from './components/photo-detail/photo-detail.component';
import { PhotoCreateComponent } from './components/photo-create/photo-create.component'; // Import de PhotoCreateComponent
import { PhotoEditComponent } from './components/photo-edit/photo-edit.component'; // À créer

export const routes: Routes = [
    { path: '', component: LandingPageComponent },
    { path: 'photos', component: PhotoListComponent },
    { path: 'photos/create', component: PhotoCreateComponent },
    { path: 'photos/edit/:id', component: PhotoEditComponent }, // Nouvelle route pour l'édition
    { path: 'photos/:id', component: PhotoDetailComponent },
    { path: 'about', loadComponent: () => import('./components/about/about.component').then(m => m.AboutComponent) },
];