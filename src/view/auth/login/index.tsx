import LoginForm from "./components/form";

export default function LoginView() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md">
        <LoginForm />
      </div>
    </section>
  );
}
