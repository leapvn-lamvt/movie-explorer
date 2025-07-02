import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export interface SearchResponse {
  Search: Movie[];
  totalResults: string;
  Response: string;
}

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private readonly API_KEY = environment.omdbApiKey;
  private readonly BASE_URL = environment.omdbBaseUrl;

  constructor(private http: HttpClient) {}

  searchMovies(query: string): Observable<Movie[]> {
    if (!query.trim()) {
      return throwError(() => new Error('Search query is required'));
    }

    const url = `${this.BASE_URL}?apikey=${this.API_KEY}&s=${encodeURIComponent(query)}`;

    return this.http.get<SearchResponse>(url).pipe(
      map(response => {
        if (response.Response === 'True') {
          return response.Search || [];
        } else {
          return [];
        }
      }),
      catchError(error => {
        console.error('Error fetching movies:', error);
        return throwError(() => new Error('Failed to fetch movies. Please try again.'));
      })
    );
  }
} 