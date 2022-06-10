import axios from "axios";
import { environment } from "../../environments/environment";

interface IGetProductsForSaleRequest {
  token: string;
}

export const getProductsForSale = async ({
                                           token
                                         }: IGetProductsForSaleRequest) => {
  const request = await axios.get(
    `${environment.env.API_URL || `/api`}/products-for-sale`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return await request.data;
};
