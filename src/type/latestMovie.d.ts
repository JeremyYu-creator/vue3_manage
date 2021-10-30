export interface castAvatars {
  small: string,
  medium: string,
  large: string,
}

export interface directorsList {
  avatars: castAvatars,
  name_en: string,
  name: string,
  alt: string,
  id: string,
}

export interface rateDetail {
  "1": number,
  "2": number,
  "3": number,
  "4": number,
  "5": number,
}

export interface castsList {
  avatars: castAvatars,
  name_en: string,
  name: string,
  alt: string,
  id: string,
}

export interface ratingList {
  max: number,
  average: number,
  details: rateDetail,
  stars: string,
  min: string,
}

export type latestMoveList = {
  rating: ratingList,
  genres: string[],
  title: string,
  casts: castsList,
  durations: string[],
  collect_count: number,
  mainland_pubdate: string,
  has_video: boolean,
  original_title: string,
  subtype: string,
  directors: directorsList,
  pubdates: string[],
  year: string,
  images: castAvatars,
  alt: string,
  id: string,
}[]

export interface middleData {
  title: string,
  subjects: latestMoveList,
}

export interface backLatestMovie {
  data: middleData,
  status: number;
  headers?: any;
  config?: any;
  request?: any;
  statusText: string;
}
