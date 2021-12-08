import Cookies from "js-cookie";
export const getToken = () => {
  // 通过服务端返回设置token
  return Cookies.get("userToken");
};

const num = 12; // 失效时间是几小时
const time = new Date(new Date().getTime() + num * 60 * 60 * 1000);
export const setToken = (token: any) => {
  // 获取到token
  return Cookies.set("userToken", token, { expires: time });
};

export const removeToken = () => {
  // 删除掉token
  return Cookies.remove("userToken");
};
