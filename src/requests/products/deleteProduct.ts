import axios from "axios";
import { environment } from "../../environments/environment";

interface IGetAuthUserRequest {
  id: string;
  token: string;
}

export const deleteProduct = async ({ id, token }: IGetAuthUserRequest) => {
  const request = await axios.delete(
    `${environment.env.API_URL || `/api`}/products/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return await request.data;
};
