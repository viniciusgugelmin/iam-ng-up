import axios from "axios";
import { environment } from "../../environments/environment";

interface IDeleteProductForSaleRequest {
  id: string;
  token: string;
}

export const deleteProductForSale = async ({
                                             id,
                                             token
                                           }: IDeleteProductForSaleRequest) => {
  const request = await axios.delete(
    `${environment.env.API_URL || `/api`}/products-for-sale/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return await request.data;
};
