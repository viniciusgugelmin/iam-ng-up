import axios from "axios";
import { environment } from "../../environments/environment";

interface IPostProductRequest {
  token: string;
  product: any;
}

export const postProduct = async ({ token, product }: IPostProductRequest) => {
  const request = await axios.post(
    `${environment.env.API_URL || `/api`}/products`,
    {
      ...product
    },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return await request.data;
};
