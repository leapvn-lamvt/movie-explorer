import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Movie } from '../../services/movie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss',
})
export class MovieCardComponent {
  @Input() movie!: Movie;

  constructor(private router: Router) {}

  navigateToDetailsPage(imdbID: string) {
    this.router.navigate(['/movie-details', imdbID]);
  }
}
