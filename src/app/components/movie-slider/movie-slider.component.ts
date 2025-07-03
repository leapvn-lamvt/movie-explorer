import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { Movie, MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movie-slider',
  standalone: true,
  imports: [SlickCarouselModule, CommonModule],
  templateUrl: './movie-slider.component.html',
  styleUrl: './movie-slider.component.scss'
})
export class MovieSliderComponent implements OnInit {
  slideConfig = {
    slidesToShow: 5,
    slidesToScroll: 1,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    dots: true,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3 }
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1 }
      }
    ]
  };


  featuredMovies: Movie[] = [];
  loading = false;
  error: string | null = null;

  constructor(private movieService: MovieService) {}
  
  ngOnInit() {
    this.fetchFeaturedMovies();
  }

  fetchFeaturedMovies() {
    this.loading = true;
    this.error = null;
    this.movieService.searchMovies('2025').subscribe({
      next: (movies) => {
        this.featuredMovies = movies.slice(0, 12);
        this.loading = false;
      },
      error: (err) => {
        this.error = err.message || 'Failed to fetch featured movies.';
        this.loading = false;
      }
    });
  }
}
