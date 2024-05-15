import axiosApp from './axiosApp';

class EventAPI {
  HandleEvent = async (
    url: string,
    data?: any,
    method?: 'get' | 'post' | 'put' | 'delete',
  ) => {
    return await axiosApp(`/events${url}`, {
      method: method ?? 'get',
      data,
    });
  };
}

const eventAPI = new EventAPI();
export default eventAPI;