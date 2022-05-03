import axios from 'axios';
import { environment } from 'src/environments/environment';

interface IGetUsersRequest {
  token: string;
}

export const getRoles = async ({ token }: IGetUsersRequest) => {
  const request = await axios.get(
    `${environment.env.API_URL || `/api`}/roles/`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return await request.data;
};
