import axios from "axios";
import { environment } from "../../environments/environment";

interface IPostProductForSaleRequest {
  token: string;
  productForSale: any;
}

export const postProductForSale = async ({
                                           token,
                                           productForSale
                                         }: IPostProductForSaleRequest) => {
  const request = await axios.post(
    `${environment.env.API_URL || `/api`}/products-for-sale`,
    {
      ...productForSale
    },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return await request.data;
};
