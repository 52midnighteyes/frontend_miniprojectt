import { Suspense } from "react";
import ResetPasswordByTokenView from "@/view/auth/reset_password_with_token";
export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordByTokenView />
    </Suspense>
  );
}
