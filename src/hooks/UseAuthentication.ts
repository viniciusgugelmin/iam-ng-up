import { getUser, logout } from '../stores/app.state';
import User from '../models/User';
import { dispatchAlert } from '../services/dispatchAlert';

const useAuthentication = async (
  user: User | null,
  token: string,
  needsPushToHome = true
) => {
  let route = '/';

  if (user && token) {
    return { user, token, route };
  }

  const localStorageToken = localStorage.getItem('iam-token');
  if (localStorageToken) {
    try {
      const getUserResponse = await getUser({ token: localStorageToken });

      return { ...getUserResponse };
    } catch (error) {
      dispatchAlert({
        message: 'You are not authenticated',
        type: 'error',
      });

      if (needsPushToHome) {
        return handleLogout();
      }
    }
  }

  if (needsPushToHome) {
    return handleLogout();
  }

  function handleLogout(): any {
    if (token) {
      const logoutResponse = logout();
      return { ...logoutResponse };
    }

    route = '/';
    return { user, token, route };
  }

  return { user, token, route };
};

export default useAuthentication;
