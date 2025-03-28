import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  template: `
    <h1>About Us</h1>
    <p>Welcome to the Photo Community application!</p>
  `,
  styles: [`
    h1 {
      color: #333;
    }
    p {
      font-size: 1.2rem;
    }
  `]
})
export class AboutComponent {}
