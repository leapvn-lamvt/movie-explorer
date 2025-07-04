import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, delay, map } from 'rxjs/operators';
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

export interface SearchMovieOptions {
  query?: string;
  page?: number;
  y?: number;
  delayMs?: number;
}

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private readonly API_KEY = environment.omdbApiKey;
  private readonly BASE_URL = environment.omdbBaseUrl;

  constructor(private http: HttpClient) {}

  searchMovies({
    query,
    page = 1,
    y,
    delayMs = 0,
  }: SearchMovieOptions): Observable<Movie[]> {
    const url = `${this.BASE_URL}?apikey=${this.API_KEY}&s=${encodeURIComponent(
      query || ''
    )}&y=${y || ''}&page=${page}`;

    let obs = this.http.get<SearchResponse>(url).pipe(
      map((response) => {
        if (response.Response === 'True') {
          return response.Search || [];
        } else {
          return [];
        }
      }),
      catchError((error) => {
        console.error('Error fetching movies:', error);
        return throwError(
          () => new Error('Failed to fetch movies. Please try again.')
        );
      })
    );

    if (delayMs > 0) {
      obs = obs.pipe(delay(delayMs));
    }

    return obs;
  }
}
