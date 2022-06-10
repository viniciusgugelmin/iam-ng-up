import axios from "axios";
import { environment } from "../../environments/environment";

interface IPutProductRequest {
  token: string;
  product: any;
  id: string;
}

export const putProduct = async ({
                                   token,
                                   product,
                                   id
                                 }: IPutProductRequest) => {
  const request = await axios.put(
    `${environment.env.API_URL || `/api`}/products/${id}`,
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
