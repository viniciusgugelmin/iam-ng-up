import axios from 'axios';
import { environment } from '../../environments/environment';

interface IGetUsersRequest {
  token: string;
  user: any;
}

export const postUser = async ({ token, user }: IGetUsersRequest) => {
  const request = await axios.post(
    `${environment.env.API_URL || `/api`}/users`,
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
