import axios from "axios";
import { environment } from "../../environments/environment";

interface IPutCustomerRequest {
  token: string;
  customer: any;
  id: string;
}

export const putCustomer = async ({
                                    token,
                                    customer,
                                    id
                                  }: IPutCustomerRequest) => {
  const request = await axios.put(
    `${environment.env.API_URL || `/api`}/customers/${id}`,
    {
      ...customer
    },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return await request.data;
};
