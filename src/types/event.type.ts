export interface IEventDetail {
  id: string;
  name: string;
  description: string;
  header: string;
  start_date: string;
  end_date: string;
  start_time: string;
  end_time: string;
  is_free: boolean;
  adress: string;
  slug: string;
  status: string;
  created_at: string;
  edited_at: string;
  location_id: string;
  organizer_id: string;
  eventCategories: IEventCategory[];
  ticketTypes: ITicketType[];
}

export interface IEventCategory {
  id: string;
  event_id: string;
  category_id: string;
}

export interface ITicketType {
  id: string;
  event_id: string;
  type: string;
  price: number;
  available_seat: number;
  is_soldout: boolean;
  description: string;
}
