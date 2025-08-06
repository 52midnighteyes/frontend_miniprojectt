"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertTriangle, CheckCircle2, Info } from "lucide-react";
import { useAuthStore } from "@/store/auth.store";
import { VerifyUserService } from "@/features/api/auth/post.auth";

export default function VerifyAccountView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const { isLogin, hasHydrated } = useAuthStore();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [alreadyVerified, setAlreadyVerified] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  useEffect(() => {
    if (!hasHydrated || !token) return;

    if (!isLogin) {
      setError(
        "You have to login first. Please try clicking the link on your email again after logging in."
      );
      setTimeout(() => router.push("/pages/auth/login"), 3000);
      return;
    }

    if (!id) {
      setAlreadyVerified(true);
      setTimeout(() => router.push("/"), 3000);
      return;
    }

    const verify = async () => {
      try {
        await VerifyUserService({ id: id as string, token });
        setSuccess(true);
        setTimeout(() => router.push("/"), 3000);
      } catch (err) {
        setError("Failed to verify account.");
        setTimeout(() => router.push("/"), 3000);
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, [id, isLogin, hasHydrated, token, router]);

  if (!hasHydrated || !token) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-[320px] p-6 rounded-2xl bg-white border border-gray-300 shadow-md text-center">
          <Skeleton className="h-6 w-3/4 mx-auto mb-4" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-10 w-full mt-4" />
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-[320px] p-6 rounded-2xl bg-white border border-gray-300 shadow-md text-center">
        <h2 className="font-bold text-2xl text-[#FFD700] mb-4">
          Verifying Account
        </h2>

        {loading && !alreadyVerified && (
          <p className="text-sm text-gray-600">Please wait...</p>
        )}

        {error && (
          <Alert className="mt-2">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="mt-2 border-green-500">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>
              Your account has been verified. Redirecting...
            </AlertDescription>
          </Alert>
        )}

        {alreadyVerified && (
          <Alert className="mt-2 border-blue-500">
            <Info className="h-4 w-4 text-blue-600" />
            <AlertTitle>Already Verified</AlertTitle>
            <AlertDescription>
              Your account is already verified. Redirecting...
            </AlertDescription>
          </Alert>
        )}
      </div>
    </section>
  );
}
