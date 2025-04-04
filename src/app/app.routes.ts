import { Routes } from '@angular/router';
import { PhotoListComponent } from './components/photo-list/photo-list.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { PhotoDetailComponent } from './components/photo-detail/photo-detail.component';
import { PhotoCreateComponent } from './components/photo-create/photo-create.component'; // Import de PhotoCreateComponent

export const routes: Routes = [
    { path: '', component: LandingPageComponent },
  { path: 'photos', component: PhotoListComponent }, // Photos route
  { path: 'photos/create', component : PhotoCreateComponent }, // Route pour la page de création de snap
  { path: 'photos/:id', component: PhotoDetailComponent }, // Route pour afficher une seule photo
  { path: 'about', loadComponent: () => import('./components/about/about.component').then(m => m.AboutComponent) }, // Lazy-loaded About page

];