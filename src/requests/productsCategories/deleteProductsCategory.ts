import axios from "axios";
import { environment } from "../../environments/environment";

interface IDeleteProductsCategoryRequest {
  id: string;
  token: string;
}

export const deleteProductsCategory = async ({
                                               id,
                                               token
                                             }: IDeleteProductsCategoryRequest) => {
  const request = await axios.delete(
    `${environment.env.API_URL || `/api`}/products/categories/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return await request.data;
};
