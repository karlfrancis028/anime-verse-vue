export interface TopAnimeResponse {
  data: object[];
  pagination: object;
};

export interface SeasonUpcomingAnimeResponse extends TopAnimeResponse {

};

export interface AnimeGenreResponse {
  data: object[];
}

export interface AnimeEpisodesResponse extends TopAnimeResponse {
  
}

export interface AnimeFullDataResponse {
  data: { [key:string]: any };
}
