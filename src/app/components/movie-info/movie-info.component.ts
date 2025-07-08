import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieDetails } from '../../services/movie.service';

@Component({
  selector: 'app-movie-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-info.component.html',
  styleUrl: './movie-info.component.scss',
})
export class MovieInfoComponent {
  @Input() movie: MovieDetails | null = null;
  @Input() loading: boolean = false;
}
