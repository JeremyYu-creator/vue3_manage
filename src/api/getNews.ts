// import instance from "@/service/interceptor";
import { get } from "@/service/interceptor";
import { backNews } from "@/type/news";
import { entEntNews } from "@/type/entNew";
import { backLatestMovie } from "@/type/latestMovie";
export const getNews = (params: { page: number; col?: number }) => {
  // 获取全部新闻
  return get<backNews>(
    "/dfz/outside/wap/news/list.d.html",
    { params },
    0,
    true
  );
};
export const getEntNews = (params: {
  page: number;
  show_num: number;
  ch: string;
}) => {
  // 获取娱乐新闻，注意这里的count有问题，可能是没理解也可能计算错误
  return get<entEntNews>("/ent/feed.d.json", { params }, 0, true);
};

export const getSportNews = (params: {
  page: number;
  show_num: number;
  ch: string;
}) => {
  // 获取体育新闻
  return get<entEntNews>("/ent/feed.d.json", { params }, 0, true);
};

export const getTechonologyNews = (params: {
  page: number;
  show_num: number;
  ch: string;
}) => {
  // 获取科技新闻
  return get<entEntNews>("/ent/feed.d.json", { params }, 0, true);
};

export const getLatestMovies = (params: { apikey: string }) => {
  // 获取豆瓣最新电影信息
  return get<backLatestMovie>("/v2/movie/new_movies", { params }, 0, true);
};
// 参数：
// col表示新闻类别
// 国内：56261
// 国际：56262
// 社会：56264
// 历史：97223
// level表示新闻等级
// show_num表示新闻条数
// page表示页码
//
// 地方资讯：56327是无锡
//         56328杭州 56329重庆
//         此处编码并不是固定的？有不同编码但是返回已有的城市新闻？不是太清楚----
//  注意： 里面的这个码并非是adcode地理编码，可能是新浪内部自定义的
//
// http://interface.sina.cn/dfz/outside/wap/news/list.d.html?col=56327
//
// 娱乐频道：
// https://interface.sina.cn/ent/feed.d.json?ch=ent&col=ent&act=more&t=1484477669001&show_num=10&page=4
// 参数说明：
// ch:频道
// 娱乐：ent
// 体育：sports
// 科技：tech
// 教育：edu
// 健康：health
// 时尚：fashion
// 博客：blog
// col：分类
// show_num
// page
// http://api.douban.com/v2/movie/new_movies?apikey=0df993c66c0c636e29ecbb5344252a4a
export default getNews;
