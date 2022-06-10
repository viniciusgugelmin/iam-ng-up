import axios from "axios";
import { environment } from "../../environments/environment";

interface IPostEntryRequest {
  token: string;
  entry: any;
}

export const postEntry = async ({ token, entry }: IPostEntryRequest) => {
  const request = await axios.post(
    `${environment.env.API_URL || `/api`}/entries`,
    {
      ...entry
    },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return await request.data;
};
