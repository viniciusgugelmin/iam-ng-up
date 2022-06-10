import axios from "axios";
import { environment } from "../../environments/environment";

interface IPutProductsCategoryRequest {
  token: string;
  productsCategory: any;
  id: string;
}

export const putProductsCategory = async ({
                                            token,
                                            productsCategory,
                                            id
                                          }: IPutProductsCategoryRequest) => {
  const request = await axios.put(
    `${environment.env.API_URL || `/api`}/products/categories/${id}`,
    {
      ...productsCategory
    },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return await request.data;
};
