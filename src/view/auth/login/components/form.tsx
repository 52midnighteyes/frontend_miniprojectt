"use client";

import { Formik, Form, FormikProps } from "formik";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeClosed } from "lucide-react";

import { userLoginSchema } from "./loginSchema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/store/auth.store";
import { LoginService } from "@/features/api/auth/post.auth";
import { ILoginParams } from "@/types/auth.types";

export default function LoginForm() {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const onAuthSuccess = useAuthStore((state) => state.onAuthSuccess);

  const initialValues: ILoginParams = {
    email: "",
    password: "",
  };

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  const handleSubmit = async ({ email, password }: ILoginParams) => {
    try {
      const res = await LoginService({ email, password });
      console.log(res);
      const { response, token } = res.data;
      console.log("hello");

      onAuthSuccess({
        id: response.id,
        email: response.email,
        firstname: response.firstname,
        lastname: response.lastname,
        avatar: response.avatar,
        role: {
          id: response.role.id,
          name: response.role.name,
        },
      });

      localStorage.setItem("token", token);

      router.push("/");
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={userLoginSchema}
    >
      {(props: FormikProps<ILoginParams>) => {
        const { values, errors, touched, handleChange } = props;
        return (
          <Form>
            <div className="w-[320px] flex flex-col gap-5 p-6 rounded-2xl bg-white border border-gray-300 text-black shadow-md hover:shadow-yellow-500/10 transition">
              <h2 className="font-bold text-2xl text-center text-[#FFD700]">
                Log In to Win.
              </h2>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-sm font-semibold">
                  Email
                </label>
                <Input
                  name="email"
                  id="email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  ref={emailRef}
                  className="rounded-2xl pl-3 pr-10"
                  placeholder="Enter your email"
                />
                <div className="min-h-4 text-xs text-red-500 ml-1">
                  {touched.email && errors.email && `*${errors.email}`}
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="password" className="text-sm font-semibold">
                  Password
                </label>
                <div className="relative w-full">
                  <Input
                    name="password"
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={values.password}
                    onChange={handleChange}
                    className="rounded-2xl pl-3 pr-10"
                    placeholder="Enter your password"
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-1/2 right-3 -translate-y-1/2 text-[#a0a0a0] hover:text-white cursor-pointer"
                  >
                    {showPassword ? <Eye /> : <EyeClosed />}
                  </span>
                </div>
                <div className="min-h-4 text-xs text-red-500 ml-1">
                  {touched.password && errors.password && `*${errors.password}`}
                </div>
              </div>

              <Button
                type="submit"
                className="mt-2 w-full bg-[#FFD700] text-[#2D2D2D] font-bold hover:bg-[#e6c200] rounded-2xl"
              >
                Log In
              </Button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
