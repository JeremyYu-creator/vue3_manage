import instance from "@/service/interceptor";
const userData = {
  getUserData(params: any) {
    return instance({
      // url: "/api/logAnalysis/countSportErrLog",
      url: "http://apidoc.rjft.net/mock/290/api/logAnalysis/countSportErrLog",
      params,
      method: "get",
    });
  },
};
export default userData
