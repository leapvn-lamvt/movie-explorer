import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MovieService, Movie } from '../../services/movie.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { MovieGridComponent } from '../../components/movie-grid/movie-grid.component';
import { MovieSliderComponent } from '../../components/movie-slider/movie-slider.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { SuggestedComponent } from '../../components/suggested/suggested.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    MovieGridComponent,
    MovieSliderComponent,
    FooterComponent,
    SuggestedComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  featuredMovies: Movie[] = [];
  recentlyReleasedMovies: Movie[] = [];

  loading = false;
  error: string | null = null;

  constructor(
    private movieService: MovieService,
    private titleService: Title
  ) {}

  ngOnInit() {
    this.titleService.setTitle('Movie Explorer - Khám phá thế giới điện ảnh');
    this.fetchRecentlyReleased();
  }

  fetchRecentlyReleased() {
    const currentYear = new Date().getFullYear();
    this.loading = true;
    this.error = null;
    this.movieService.searchMovies(currentYear.toString()).subscribe({
      next: (movies) => {
        this.recentlyReleasedMovies = movies.slice(0, 9);
        this.featuredMovies = movies.slice(0, 24);
        this.loading = false;
      },
      error: (err) => {
        this.error = err.message || 'Failed to fetch recently released movies.';
        this.loading = false;
      },
    });
  }
}
