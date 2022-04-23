import axios from 'axios';
import { environment } from '../../environments/environment';

interface IGetAuthUserRequest {
  token: string;
}

export const getAuthUser = async ({ token }: IGetAuthUserRequest) => {
  const request = await axios.get(`${environment.env.API_URL || `/api`}/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return await request.data;
};
