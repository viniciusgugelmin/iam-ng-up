import axios from 'axios';
import { environment } from '../../environments/environment';

interface IGetSalesRequest {
  token: string;
}

export const getSales = async ({ token }: IGetSalesRequest) => {
  const request = await axios.get(
    `${environment.env.API_URL || `/api`}/sales`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return await request.data;
};
