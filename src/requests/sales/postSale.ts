import axios from 'axios';
import { environment } from '../../environments/environment';

interface IPostSaleRequest {
  sale: any;
}

export const postSale = async ({ sale }: IPostSaleRequest) => {
  const request = await axios.post(
    `${environment.env.API_URL || `/api`}/sales`,
    {
      ...sale,
    }
  );

  return await request.data;
};
