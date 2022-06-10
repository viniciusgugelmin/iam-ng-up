import axios from "axios";
import { environment } from "../../environments/environment";

interface IGetProductRequest {
  token: string;
  id: string;
}

export const getProduct = async ({ token, id }: IGetProductRequest) => {
  const request = await axios.get(
    `${environment.env.API_URL || `/api`}/products/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return await request.data;
};
