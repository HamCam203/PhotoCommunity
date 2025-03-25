import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PhotoListComponent } from './components/photo-list/photo-list.component';

@Component({
  selector: 'app-root',
  imports: [PhotoListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'PhotoCommunity';
}
