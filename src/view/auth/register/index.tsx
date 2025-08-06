import RegisterForm from "./components/registerForm";

export default function RegisterView() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md">
        <RegisterForm />
      </div>
    </section>
  );
}
