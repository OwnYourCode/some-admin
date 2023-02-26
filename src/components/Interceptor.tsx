import { authService } from '../services/authService';
import { request } from '../services/requestService';

export const Interceptor = () => {
  request.interceptors.request.use(
    async (request) => {
      const accessToken = await authService.getAccessToken();

      request.headers = {
        ...request.headers,
        authorization: `Bearer ${accessToken}`,
      };

      return request;
    },
    async (error) => {
      console.log(error);

      await Promise.reject(error);
    },
  );

  request.interceptors.response.use(
    (response) => response,
    async (error) => {
      console.log(error);

      await Promise.reject(error);
    },
  );

  return null;
};
