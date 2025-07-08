import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SearchComponent } from './pages/search/search.component';
import { CategoryComponent } from './pages/category/category.component';
import { MovieDetailsComponent } from './pages/movie-details/movie-details.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'search', component: SearchComponent },
  { path: 'category/:slug', component: CategoryComponent },
  { path: 'movie-details/:imdbID', component: MovieDetailsComponent },
  { path: 'about-us', component: AboutUsComponent }
];
