import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  imports: [],
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'] // Correction de styleUrl en styleUrls
})
export class LandingPageComponent {
   constructor(private router: Router) { }

   onContinue() {
    this.router.navigateByUrl('/photos'); // Correction de la route
  }
}
