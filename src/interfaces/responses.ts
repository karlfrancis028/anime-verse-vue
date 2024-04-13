export interface TopAnimeResponse {
  data: object[],
  pagination: object,
};

export interface SeasonUpcomingAnimeResponse extends TopAnimeResponse {

};

export interface AnimeGenreResponse {
  data: object[],
}
