import axios from "axios";
import { environment } from "../../environments/environment";

interface IGetCustomersRequest {
  token: string;
}

export const getCustomers = async ({ token }: IGetCustomersRequest) => {
  const request = await axios.get(
    `${environment.env.API_URL || `/api`}/customers`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return await request.data;
};
