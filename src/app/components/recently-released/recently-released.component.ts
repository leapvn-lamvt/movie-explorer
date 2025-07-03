import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { Movie } from '../../services/movie.service';

@Component({
  selector: 'app-recently-released',
  standalone: true,
  imports: [CommonModule, MovieCardComponent],
  templateUrl: './recently-released.component.html',
  styleUrl: './recently-released.component.scss'
})
export class RecentlyReleasedComponent {
  @Input() movies!: Movie[];
}
