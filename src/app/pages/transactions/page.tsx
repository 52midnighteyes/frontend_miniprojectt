import CreateTransactionView from "@/view/CreateTransaction";
import { Suspense } from "react";

export default function CreateTransactionPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        <CreateTransactionView />
      </div>
    </Suspense>
  );
}
