import { titleSlugMap } from '../constants/categories';

export function getTitleBySlug(slug: string | null | undefined): string {
  if (!slug) return 'Thể loại phim';
  return titleSlugMap[slug] || 'Thể loại phim';
}
