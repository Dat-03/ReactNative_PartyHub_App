import {appInfo} from '../constants/appInfos';
import axiosApp from './axiosApp';

class AuthAPI {
  HandleAuthentication = async (
    url: string,
    data?: any,
    method?: 'get' | 'post' | 'put' | 'delete',
  ) => {
    return await axiosApp(`${appInfo.BASE_URL}/auth${url}`, {
      method: method ?? 'get',
      data,
    });
  };
}
const authenticationAPI = new AuthAPI();
export default authenticationAPI;
