import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { MovieGridComponent } from '../../components/movie-grid/movie-grid.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { SuggestedComponent } from '../../components/suggested/suggested.component';
import { Movie, MovieService } from '../../services/movie.service';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { getTitleBySlug } from '../../utils/categoryUtils';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    MovieGridComponent,
    FooterComponent,
    SuggestedComponent,
  ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
})
export class CategoryComponent implements OnInit {
  movies: Movie[] = [];
  title: string = '';
  slug: string = '';

  loading = false;
  error: string | null = null;

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute,
    private titleService: Title
  ) {}

  ngOnInit() {
    this.titleService.setTitle(`Movie Explorer - Thể loại phim`);
    this.movies = [];
    this.route.paramMap.subscribe((params) => {
      this.slug = params.get('slug') || '';
    });
    this.title = getTitleBySlug(this.slug);
    this.searchMoviesByKeyword(this.slug)
  }

  searchMoviesByKeyword(query: string) {
    this.loading = true;
    this.error = null;
    this.movies = [];
    this.movieService
      .searchMovies({
        query,
        delayMs: 1500,
      })
      .subscribe({
        next: (movies) => {
          this.movies = movies.slice(0, 9);
          this.loading = false;
        },
        error: (error) => {
          this.error =
            error.message || 'An error occurred while searching for movies.';
          this.loading = false;
        },
      });
  }
}
