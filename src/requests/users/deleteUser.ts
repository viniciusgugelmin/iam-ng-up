import axios from 'axios';
import { environment } from '../../environments/environment';

interface IGetAuthUserRequest {
  id: string;
  token: string;
}

export const deleteUser = async ({ id, token }: IGetAuthUserRequest) => {
  const request = await axios.delete(
    `${environment.env.API_URL || `/api`}/users/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return await request.data;
};
