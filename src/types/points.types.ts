export interface IUserPoint {
  id: string;
  user_id: string;
  points_amount: number;
  created_at: string;
  expired_date: string;
  is_used: boolean;
}

export interface IGetPointsResponse {
  message: string;
  data: {
    points: IUserPoint[];
    totalPoints: number;
  };
}
