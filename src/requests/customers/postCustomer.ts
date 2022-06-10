import axios from "axios";
import { environment } from "../../environments/environment";

interface IPostCustomerRequest {
  token: string;
  customer: any;
}

export const postCustomer = async ({
                                     token,
                                     customer
                                   }: IPostCustomerRequest) => {
  const request = await axios.post(
    `${environment.env.API_URL || `/api`}/customers`,
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
