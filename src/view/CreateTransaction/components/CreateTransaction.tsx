"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { GetUserPointsService } from "@/features/api/points/get.points";
import { GetEventDetailService } from "@/features/api/event/get.event";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { useAuthStore } from "@/store/auth.store";
import { IUserPoint } from "@/types/points.types";

interface TicketType {
  id: string;
  type: string;
  price: number;
  description: string;
  available_seat: number;
  is_soldout: boolean;
}

interface EventResponse {
  id: string;
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  start_time: string;
  end_time: string;
  adress: string;
  ticketTypes: TicketType[];
}

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export default function CreateTransactionForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const event_id = searchParams.get("event_id");

  const [event, setEvent] = useState<EventResponse | null>(null);
  const [points, setPoints] = useState<IUserPoint[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<string>("");
  const [selectedPointId, setSelectedPointId] = useState<string | undefined>();
  const [couponCode, setCouponCode] = useState("");
  const [voucherCode, setVoucherCode] = useState("");
  const [loading, setLoading] = useState(false);

  const { isLogin, hasHydrated } = useAuthStore();

  useEffect(() => {
    if (!hasHydrated) return;
    if (!isLogin) router.push("/pages/auth/login");
  }, [hasHydrated, isLogin, router]);

  useEffect(() => {
    if (!event_id) return;
    fetchEvent(event_id);
    fetchUserPoints();
  }, [event_id]);

  const fetchEvent = async (id: string) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const eventData = await GetEventDetailService(id, token);
      setEvent(eventData);
    } catch (err) {
      console.error("Failed to fetch event", err);
    }
  };

  const fetchUserPoints = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const pointData = await GetUserPointsService(token);
      setPoints(pointData);
    } catch (err) {
      console.error("Failed to fetch user points", err);
    }
  };

  const handleSubmit = async () => {
    if (!event_id || !selectedTicket) return;

    setLoading(true);
    const apiURL = process.env.NEXT_PUBLIC_API_URL;
    const token = localStorage.getItem("token");

    try {
      // === SATU-SATUNYA PERUBAHAN ADA DI SINI ===
      const payload: any = {
        event_id,
        ticket_type_id: selectedTicket,
        ...(couponCode && { coupon_code: couponCode }),
        ...(voucherCode && { voucher_code: voucherCode }),
        ...(selectedPointId && { points_id: selectedPointId }),
      };

      const res = await axios.post(`${apiURL}/api/transactions`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const transactionId = (res.data as { data: { id: string } }).data.id;
      router.push(`/payment?transaction_id=${transactionId}`);
    } catch (err) {
      console.error("Failed to create transaction", err);
    } finally {
      setLoading(false);
    }
  };

  if (!event) {
    return (
      <div className="max-w-md mx-auto mt-10 p-6">
        <Skeleton className="h-6 w-3/4 mb-4" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-5/6 mb-6" />
        <Skeleton className="h-10 w-full" />
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl border shadow-sm">
      <h2 className="text-xl font-bold text-center text-[#FFD700] mb-2">
        {event.name}
      </h2>
      <p className="text-sm text-gray-600 text-center mb-1">
        {event.description}
      </p>
      <p className="text-sm text-gray-500 text-center mb-6">
        {formatDate(event.start_date)} | {event.start_time} - {event.end_time}
      </p>

      <Label className="text-md font-semibold">Grab Your Ticket</Label>
      <RadioGroup
        value={selectedTicket}
        onValueChange={setSelectedTicket}
        className="space-y-4 my-4"
      >
        {event.ticketTypes.map((ticket) => (
          <Card
            key={ticket.id}
            className={`p-4 transition-all ${
              selectedTicket === ticket.id
                ? "border-[#FFD700]"
                : "border-gray-300"
            }`}
          >
            <Label className="flex items-center space-x-3 cursor-pointer">
              <RadioGroupItem value={ticket.id} disabled={ticket.is_soldout} />
              <div className="flex flex-col">
                <span className="font-semibold">
                  {ticket.type} — Rp{ticket.price.toLocaleString()}
                </span>
                <span className="text-sm text-muted-foreground">
                  {ticket.description}
                </span>
                {ticket.is_soldout && (
                  <span className="text-xs text-red-500">Sold Out</span>
                )}
              </div>
            </Label>
          </Card>
        ))}
      </RadioGroup>

      <div className="my-4">
        <Label htmlFor="couponCode">Coupon Code</Label>
        <Input
          id="couponCode"
          placeholder="Input Your Code (Optional)"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          className="rounded-2xl mt-1"
        />
      </div>

      <div className="mb-4">
        <Label htmlFor="voucherCode">Voucher Code</Label>
        <Input
          id="voucherCode"
          placeholder="Input Your Code (Optional)"
          value={voucherCode}
          onChange={(e) => setVoucherCode(e.target.value)}
          className="rounded-2xl mt-1"
        />
      </div>

      <div className="mb-6">
        <Label htmlFor="pointSelect">Points</Label>
        <Select
          onValueChange={(value) => setSelectedPointId(value)}
          value={selectedPointId}
        >
          <SelectTrigger className="mt-1 rounded-2xl">
            <SelectValue placeholder="Use Your Point" />
          </SelectTrigger>
          <SelectContent>
            {points.length === 0 ? (
              <SelectItem value="none" disabled>
                You Have No Points
              </SelectItem>
            ) : (
              points.map((point) => (
                <SelectItem key={point.id} value={point.id}>
                  {point.points_amount} points
                </SelectItem>
              ))
            )}
          </SelectContent>
        </Select>
      </div>

      <Button
        onClick={handleSubmit}
        disabled={loading || !selectedTicket}
        className="w-full bg-[#FFD700] text-[#2D2D2D] font-bold hover:bg-[#e6c200] rounded-2xl"
      >
        {loading ? "Processing..." : "Buy Ticket"}
      </Button>
    </div>
  );
}
