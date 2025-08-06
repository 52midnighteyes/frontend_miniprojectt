import { Suspense } from "react";
import VerifyAccountView from "@/view/auth/verifyUser";
export default function Page() {
  return (
    <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
      <VerifyAccountView />
    </Suspense>
  );
}
