import { Routes } from '@angular/router';
import { PhotoListComponent } from './components/photo-list/photo-list.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';

export const routes: Routes = [
    { path: '', component: LandingPageComponent },
  { path: 'photos', component: PhotoListComponent }, // Photos route
  { path: 'about', loadComponent: () => import('./components/about/about.component').then(m => m.AboutComponent) } // Lazy-loaded About page
];