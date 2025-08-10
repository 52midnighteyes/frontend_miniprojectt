import axios from "axios";
import { IEventDetail } from "@/types/event.type";
interface IGetEventDetailResponse {
  message: string;
  data: IEventDetail;
}

export async function GetEventDetailService(
  event_id: string,
  token: string
): Promise<IEventDetail> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const response = await axios.get<IGetEventDetailResponse>(
      `${apiUrl}/api/events/details?event_id=${event_id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data.data;
  } catch (err) {
    console.error("[GetEventDetailService Error]", err);
    throw new Error("Failed to fetch event details");
  }
}
