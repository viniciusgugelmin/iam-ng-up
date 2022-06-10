import axios from "axios";
import { environment } from "../../environments/environment";

interface IGetAllStorageRequest {
  token: string;
}

export const getAllStorage = async ({ token }: IGetAllStorageRequest) => {
  const request = await axios.get(
    `${environment.env.API_URL || `/api`}/storage`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return await request.data;
};
