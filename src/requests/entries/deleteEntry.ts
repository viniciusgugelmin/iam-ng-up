import axios from "axios";
import { environment } from "../../environments/environment";

interface IDeleteEntryRequest {
  id: string;
  token: string;
}

export const deleteEntry = async ({ id, token }: IDeleteEntryRequest) => {
  const request = await axios.delete(
    `${environment.env.API_URL || `/api`}/entries/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return await request.data;
};
