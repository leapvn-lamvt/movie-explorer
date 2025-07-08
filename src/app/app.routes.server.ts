import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'about-us',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'movie-details/:imdbID',
    renderMode: RenderMode.Server,
  },
  {
    path: 'category/:slug',
    renderMode: RenderMode.Server,
  },
  {
    path: '**',
    renderMode: RenderMode.Server,
  },
];
