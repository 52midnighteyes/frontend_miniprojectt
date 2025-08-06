"use client";

import { Formik, Form, FormikProps } from "formik";
import { useRef, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MailCheck } from "lucide-react";
import { requestForgotPasswordService } from "@/features/api/auth/post.auth";
import * as Yup from "yup";
import { useRouter } from "next/navigation";

export default function RequestForgotPasswordForm() {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const router = useRouter();

  const initialValues = {
    email: "",
  };

  const forgotPasswordSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
  });

  const handleSubmit = async ({ email }: { email: string }) => {
    try {
      await requestForgotPasswordService({ email });
      setShowAlert(true);

      setTimeout(() => {
        router.push("/");
      }, 3000);
    } catch (err) {
      console.error("Forgot password error:", err);
      setShowAlert(true);
    }
  };

  return (
    <>
      {showAlert ? (
        <Alert className="mb-6 w-[320px] mx-auto">
          <MailCheck className="h-4 w-4" />
          <AlertTitle>Check your email</AlertTitle>
          <AlertDescription>
            We sent you the email if your email is in our database.
          </AlertDescription>
        </Alert>
      ) : (
        <Formik
          initialValues={initialValues}
          validationSchema={forgotPasswordSchema}
          onSubmit={handleSubmit}
        >
          {(props: FormikProps<{ email: string }>) => {
            const { values, errors, touched, handleChange } = props;

            return (
              <Form>
                <div className="w-[320px] flex flex-col gap-5 p-6 rounded-2xl bg-white border border-gray-300 text-black shadow-md hover:shadow-yellow-500/10 transition mx-auto">
                  <h2 className="font-bold text-2xl text-center text-[#FFD700]">
                    Forgot Password
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

                  <Button
                    type="submit"
                    className="mt-2 w-full bg-[#FFD700] text-[#2D2D2D] font-bold hover:bg-[#e6c200] rounded-2xl"
                  >
                    Submit
                  </Button>
                </div>
              </Form>
            );
          }}
        </Formik>
      )}
    </>
  );
}
