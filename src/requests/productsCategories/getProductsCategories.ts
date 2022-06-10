import axios from "axios";
import { environment } from "../../environments/environment";

interface IGetProductsCategoriesRequest {
  token: string;
}

export const getProductsCategories = async ({
                                              token
                                            }: IGetProductsCategoriesRequest) => {
  const request = await axios.get(
    `${environment.env.API_URL || `/api`}/products/categories`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return await request.data;
};
