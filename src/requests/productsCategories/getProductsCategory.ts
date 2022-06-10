import axios from "axios";
import { environment } from "../../environments/environment";

interface IGetProductsCategoryRequest {
  token: string;
  id: string;
}

export const getProductsCategory = async ({
                                            token,
                                            id
                                          }: IGetProductsCategoryRequest) => {
  const request = await axios.get(
    `${environment.env.API_URL || `/api`}/products/categories/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return await request.data;
};
