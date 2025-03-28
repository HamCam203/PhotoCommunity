import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PhotoListComponent } from './components/photo-list/photo-list.component';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'PhotoCommunity';
}
