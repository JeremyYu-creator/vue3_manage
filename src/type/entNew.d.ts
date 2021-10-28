export interface picCount {
  total: number,
}

export interface entNewsData {
  comment: number,
  comment_id: string,
  commentid: string,
  dataid: string,
  date: string,
  docID: string,
  img: string,
  intro: string,
  isDujia: number,
  isSubject: number,
  link: string,
  mediaTypes: string,
  newsTag: string,
  newsType: string,
  news_date: string,
  pics: picCount,
  source: string,
  title: string,
  type: string,
  wap_title: string,
}

export interface detailData {
  data: entNewsData,
}

export interface entNewsResult {
    data: detailData,
    count: number,
    message: string,
    status: number,
}

export interface entEntNews {
  data: entNewsResult;
  status: number;
  headers?: any;
  config?: any;
  request?: any;
  statusText: string;
}
