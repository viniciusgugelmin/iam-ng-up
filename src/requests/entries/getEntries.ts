import axios from "axios";
import { environment } from "../../environments/environment";

interface IGetEntriesRequest {
  token: string;
}

export const getEntries = async ({ token }: IGetEntriesRequest) => {
  const request = await axios.get(
    `${environment.env.API_URL || `/api`}/entries`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return await request.data;
};
