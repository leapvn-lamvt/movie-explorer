import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'category/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => [
      { slug: 'action' },
      { slug: 'romance' },
      { slug: 'horror' },
      { slug: 'animation' },
      { slug: 'adventure' },
      { slug: 'comedy' },
      { slug: 'science-fiction' },
      { slug: 'documentary' }
    ]
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
