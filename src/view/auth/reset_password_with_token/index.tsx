import ResetPasswordByRequestForm from "./components/form";
export default function ResetPasswordByTokenView() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md">
        <ResetPasswordByRequestForm />
      </div>
    </section>
  );
}
