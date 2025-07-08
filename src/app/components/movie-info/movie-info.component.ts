import { Component, Input, OnInit } from '@angular/core';
import { MovieDetails } from '../../services/movie.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-info.component.html',
  styleUrl: './movie-info.component.scss',
})
export class MovieInfoComponent {
  @Input() loading!: boolean;
  @Input() movie: MovieDetails | null = null;
}
