import axios from "axios";
import { IUserPoint, IGetPointsResponse } from "@/types/points.types";

export async function GetUserPointsService(
  token: string
): Promise<IUserPoint[]> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) throw new Error("API URL is not defined");

    const { data } = await axios.get<IGetPointsResponse>(
      `${apiUrl}/api/points/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return data.data.points;
  } catch (err) {
    console.error("[GetUserPointsService Error]", err);
    throw new Error("Failed to fetch user points");
  }
}
