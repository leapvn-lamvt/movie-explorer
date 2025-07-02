import { Component } from '@angular/core';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { MovieListComponent } from '../../components/movie-list/movie-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SearchBarComponent, MovieListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  searchResults: any[] = [];

  onSearch(query: string) {
    // TODO: Integrate OMDB API call here
    this.searchResults = [];
  }
}
