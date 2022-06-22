import axios from 'axios';
import { environment } from '../../environments/environment';

export const getProductsForSale = async ({}) => {
  const request = await axios.get(
    `${environment.env.API_URL || `/api`}/products-for-sale`
  );

  return await request.data;
};
