import axios from "axios";
import { environment } from "../../environments/environment";

interface IGetUsersRequest {
  token: string;
}

export const getProducts = async ({ token }: IGetUsersRequest) => {
  const request = await axios.get(
    `${environment.env.API_URL || `/api`}/products`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return await request.data;
};
