import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { Movie } from '../../services/movie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-slider',
  standalone: true,
  imports: [SlickCarouselModule, CommonModule],
  templateUrl: './movie-slider.component.html',
  styleUrl: './movie-slider.component.scss'
})
export class MovieSliderComponent {
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

  sekeletonSlideConfig = {
    slidesToShow: 5,
    slidesToScroll: 1,
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

  @Input() featuredMovies!: Movie[];
  @Input() loading: boolean = false;

  constructor(private router: Router) {}

  navigateToDetailsPage(imdbID: string) {
    this.router.navigate(['/movie-details', imdbID]);
  }
}
