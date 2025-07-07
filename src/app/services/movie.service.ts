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
  Error?: string;
}

export interface MovieDetails {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
  Error?: string;
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
          // Handle specific OMDb API errors
          if (response.Error) {
            if (response.Error.toLowerCase().includes('too many results')) {
              throw new Error(
                'Too many results found. Please try a more specific search term.'
              );
            } else if (
              response.Error.toLowerCase().includes('movie not found')
            ) {
              return [];
            } else {
              throw new Error(response.Error);
            }
          }
          return [];
        }
      }),
      catchError((error) => {
        console.error('Error fetching movies:', error);
        if (
          error.message &&
          (error.message.includes('Too many results') ||
            error.message.includes('movie not found'))
        ) {
          return throwError(() => error);
        }
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

  getMovieById(imdbId: string, delayMs: number = 0): Observable<MovieDetails> {
    const url = `${this.BASE_URL}?apikey=${this.API_KEY}&i=${encodeURIComponent(
      imdbId
    )}&plot=full`;

    let obs = this.http.get<MovieDetails>(url).pipe(
      map((response) => {
        if (response.Response === 'True') {
          return response;
        } else {
          // Handle specific OMDb API errors
          if (response.Error) {
            if (response.Error.toLowerCase().includes('movie not found')) {
              throw new Error(
                'Movie not found. Please check the ID and try again.'
              );
            } else {
              throw new Error(response.Error);
            }
          }
          throw new Error('Failed to fetch movie details.');
        }
      }),
      catchError((error) => {
        console.error('Error fetching movie details:', error);
        if (error.message && error.message.includes('Movie not found')) {
          return throwError(() => error);
        }
        return throwError(
          () => new Error('Failed to fetch movie details. Please try again.')
        );
      })
    );

    if (delayMs > 0) {
      obs = obs.pipe(delay(delayMs));
    }

    return obs;
  }
}
