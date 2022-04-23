import axios from 'axios';
import { environment } from '../../environments/environment';

interface IPostLoginUserRequest {
  email: string;
  password: string;
}

export const postLoginUser = async ({
  email,
  password,
}: IPostLoginUserRequest) => {
  const request = await axios.post(
    `${environment.env.API_URL || `/api`}/user`,
    {
      email,
      password,
    }
  );

  return await request.data;
};
