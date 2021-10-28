export interface picDetail {
  imgurl: string;
  isCover: boolean;
  note: string;
}

export interface picAll {
  pics: picDetail[];
}

export interface newDetail {
  URL: string;
  allPics: picAll[];
  cTime: string;
  comment: string;
  commentid: string;
  source: string;
  summary: string;
  title: string;
  type: string;
  _id: string;
}

export interface newsData {
  count: number;
  total: number;
  list: newDetail[];
}
export interface newsStatus {
  code: number;
  msg: string;
}

export interface resultHave {
  data: newsData;
  status: newsStatus;
}
export interface resultItem {
  result: resultHave;
}
export interface backNews {
  data: resultItem;
  status: number;
  headers?: any;
  config?: any;
  request?: any;
  statusText: string;
}
