import axios from 'axios';
import { environment } from '../../environments/environment';

interface IGetUserRequest {
  token: string;
  id: string;
}

export const getUser = async ({ token, id }: IGetUserRequest) => {
  const request = await axios.get(
    `${environment.env.API_URL || `/api`}/users/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return await request.data;
};
