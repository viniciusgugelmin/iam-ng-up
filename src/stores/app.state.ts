import User from '../models/User';
import { IUserAuth, IUserLogin } from '../interfaces/IUser';
import AppError from '../errors/AppError';
import { postLoginUser } from '../requests/user/postLoginUser';
import { IError } from '../interfaces/IError';
import { getAuthUser } from '../requests/user/getAuthUser';

export interface AppState {
  readonly user: User;
  readonly token: string;
}

export const login = async ({ email, password }: IUserLogin) => {
  if (!email || !password) {
    throw new AppError('Email and password are required', 422);
  }

  let user = {};
  let token = '';

  try {
    const loginResponse = await postLoginUser({
      email,
      password,
    });

    user = loginResponse.user;
    token = loginResponse.token;
    localStorage.setItem('iam-token', token);
  } catch (error) {
    localStorage.removeItem('iam-token');

    if (!(error as { response?: any }).response) {
      throw new AppError('Server error', 500);
    }

    throw new AppError(
      (error as IError).response.data.message,
      (error as IError).response.status
    );
  }

  return {
    user,
    token,
    route: '/home',
  };
};

export const getUser = async ({ token }: IUserAuth) => {
  if (!token) {
    throw new AppError('Token is required', 422);
  }

  let user = {};

  try {
    const getUserResponse = await getAuthUser({ token });

    user = getUserResponse.user;
  } catch (error) {
    localStorage.removeItem('iam-token');

    if (!(error as { response?: any }).response) {
      throw new AppError('Server error', 500);
    }

    throw new AppError(
      (error as IError).response.data.message,
      (error as IError).response.status
    );
  }

  return {
    user,
    token,
    route: '/home',
  };
};

export const logout = () => {
  localStorage.removeItem('iam-token');

  return {
    user: null,
    token: '',
    route: '/',
  };
};
