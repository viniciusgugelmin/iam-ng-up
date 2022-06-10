import axios from "axios";
import { environment } from "../../environments/environment";

interface IDeleteCustomerRequest {
  id: string;
  token: string;
}

export const deleteCustomer = async ({ id, token }: IDeleteCustomerRequest) => {
  const request = await axios.delete(
    `${environment.env.API_URL || `/api`}/customers/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return await request.data;
};
