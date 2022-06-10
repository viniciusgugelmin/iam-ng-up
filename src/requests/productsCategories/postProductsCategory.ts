import axios from "axios";
import { environment } from "../../environments/environment";

interface IPostProductsCategoryRequest {
  token: string;
  productsCategory: any;
}

export const postProductsCategory = async ({
                                             token,
                                             productsCategory
                                           }: IPostProductsCategoryRequest) => {
  const request = await axios.post(
    `${environment.env.API_URL || `/api`}/products/categories`,
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
