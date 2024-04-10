import { 
  TopAnimeTypes,
  TopAnimeFilters,
  TopAnimeAudienceRatings,
} from '@/references/index';

export interface TopAnimeParams {
  type?: TopAnimeTypes,
  filter?: TopAnimeFilters,
  rating?: TopAnimeAudienceRatings,
  sfw?: boolean,
  page?: number,
  limit?: number,
};
