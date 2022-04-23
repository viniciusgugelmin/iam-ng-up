import axios from 'axios';
import { environment } from '../../environments/environment';

interface IPutUserRequest {
  token: string;
  user: any;
  id: string;
}

export const putUser = async ({ token, user, id }: IPutUserRequest) => {
  const request = await axios.put(
    `${environment.env.API_URL || `/api`}/users/${id}`,
    {
      ...user,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return await request.data;
};
