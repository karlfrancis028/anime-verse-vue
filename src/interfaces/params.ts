import { 
  TopAnimeTypes,
  TopAnimeFilters,
  TopAnimeAudienceRatings,
  SeasonUpcomingAnimeFilters,
  AnimeGenreFilters,
} from '@/references/index';

export interface TopAnimeParams {
  type?: TopAnimeTypes,
  filter?: TopAnimeFilters,
  rating?: TopAnimeAudienceRatings,
  sfw?: boolean,
  page?: number,
  limit?: number,
};

export interface SeasonUpcomingAnimeParams {
  filter?: SeasonUpcomingAnimeFilters,
  sfw?: boolean,
  unapproved?: boolean,
  page?: number,
  limit?: number,
}

export interface AnimeGenreParams {
  filter?: AnimeGenreFilters,
}
