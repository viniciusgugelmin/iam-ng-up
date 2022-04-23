import axios from 'axios';
import { environment } from '../../environments/environment';

interface IPostSignupUserRequest {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  adminCode: string;
}

export const postSignupUser = async ({
  name,
  email,
  password,
  confirmPassword,
  adminCode,
}: IPostSignupUserRequest) => {
  const request = await axios.post(
    `${environment.env.API_URL || `/api`}/user`,
    {
      name,
      email,
      password,
      confirmPassword,
      adminCode,
    }
  );

  return await request.data;
};
