import axios from "axios";
import { environment } from "../../environments/environment";

interface IGetCustomerRequest {
  token: string;
  id: string;
}

export const getCustomer = async ({ token, id }: IGetCustomerRequest) => {
  const request = await axios.get(
    `${environment.env.API_URL || `/api`}/customers/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return await request.data;
};
