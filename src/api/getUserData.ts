// import instance from "@/service/interceptor";
import {get} from '@/service/interceptor'
export const userData = (params: any) => {
  return get(
    'http://apidoc.rjft.net/mock/290/api/logAnalysis/countSportErrLog',
    {params},
    0,
    true,
  )
};
