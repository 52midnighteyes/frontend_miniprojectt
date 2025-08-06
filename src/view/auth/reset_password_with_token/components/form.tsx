"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Formik, Form, FormikProps } from "formik";
import * as Yup from "yup";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

import { ResetPasswordByRequestService } from "@/features/api/auth/post.auth";

interface IResetForm {
  password: string;
  confirmPassword: string;
}

export default function ResetPasswordByRequestForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [tokenExpired, setTokenExpired] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) {
      setTokenExpired(true);
      setTimeout(() => router.push("/"), 3000);
    }
  }, [token, router]);

  const resetSchema = Yup.object().shape({
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords do not match")
      .required("Please confirm your password"),
  });

  const handleSubmit = async (values: IResetForm) => {
    try {
      await ResetPasswordByRequestService({
        token: token || "",
        password: values.password,
      });
      router.push("/login");
    } catch (err) {
      setError("Failed to reset password. Please make another request.");
      router.push("/login");
    }
  };

  if (tokenExpired) {
    return (
      <Alert className="w-[320px] mx-auto mt-10">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Token expired</AlertTitle>
        <AlertDescription>
          Your reset link is invalid. Redirecting...
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="w-[320px] mx-auto mt-10 p-6 rounded-2xl bg-white border border-gray-300 shadow-md">
      <h2 className="font-bold text-2xl text-center text-[#FFD700] mb-4">
        Reset Password
      </h2>

      {error && (
        <Alert className="mb-4">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Formik
        initialValues={{ password: "", confirmPassword: "" }}
        validationSchema={resetSchema}
        onSubmit={handleSubmit}
      >
        {(props: FormikProps<IResetForm>) => {
          const { values, errors, touched, handleChange } = props;

          return (
            <Form className="flex flex-col gap-5">
              <div>
                <label className="text-sm font-semibold">New Password</label>
                <Input
                  name="password"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  placeholder="Enter new password"
                  className="rounded-2xl"
                />
                <div className="text-xs text-red-500 mt-1">
                  {touched.password && errors.password && `*${errors.password}`}
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold">
                  Confirm Password
                </label>
                <Input
                  name="confirmPassword"
                  type="password"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  placeholder="Repeat new password"
                  className="rounded-2xl"
                />
                <div className="text-xs text-red-500 mt-1">
                  {touched.confirmPassword &&
                    errors.confirmPassword &&
                    `*${errors.confirmPassword}`}
                </div>
              </div>

              <Button
                type="submit"
                className="mt-2 w-full bg-[#FFD700] text-[#2D2D2D] font-bold hover:bg-[#e6c200] rounded-2xl"
              >
                Reset Password
              </Button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
