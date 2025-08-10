import CreateTransactionForm from "./components/CreateTransaction";
export default function CreateTransactionView() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md">
        <CreateTransactionForm />
      </div>
    </section>
  );
}
