import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Movie } from '../../services/movie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-column',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-column.component.html',
  styleUrl: './movie-column.component.scss',
})
export class MovieColumnComponent {
  @Input() loading: boolean = false;
  @Input() title!: string;
  @Input() movies!: Movie[];

  constructor(private router: Router) {}

  navigateToDetailsPage(imdbID: string) {
    this.router.navigate(['/movie-details', imdbID]);
  }
}
