/**
 * @author yuanweimin
 * @data 19/08/08 12:35
 * @description cookie 操作工具
 */
import Cookies from "js-cookie";

export const TOKEN_KEY = "token";

/**
 * token 设置
 * @param {token} token 
 */
export const setToken = token => {
  Cookies.set(TOKEN_KEY, token, { expires: 1 });
};

/**
 * token 获取
 */
export const getToken = () => {
  const token = Cookies.get(TOKEN_KEY);
  if (token) return token;
  else return false;
};

/**
 * 移除 token
 */
export const removeToken = () => {
  Cookies.remove(TOKEN_KEY);
};
