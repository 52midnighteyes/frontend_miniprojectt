"use client";

import { Formik, Form, FormikProps } from "formik";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { useAuthStore } from "@/store/auth.store";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { userRegisterSchema } from "./register.schema";
import { RegisterService } from "@/features/api/auth/post.auth";
import { IRegisterParams } from "@/types/auth.types";

export default function RegisterForm() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");

  const initialValues: IRegisterParams = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    role_id: "a942e5c2-0a2b-49c8-8f28-8483ad3d2dc7", // default: user
    referral_code: "",
  };

  const { onAuthSuccess } = useAuthStore();

  const handleSubmit = async (values: IRegisterParams) => {
    try {
      const res = await RegisterService(values);
      console.log(res);

      const { token, response } = res.data;
      console.log(token, response);

      // simpan token ke localStorage
      localStorage.setItem("token", token);

      // update auth store
      onAuthSuccess(response);

      // redirect ke homepage
      router.push("/");
    } catch (error: any) {
      setErrorMessage(error?.message || "Something went wrong.");
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={userRegisterSchema}
    >
      {(props: FormikProps<IRegisterParams>) => {
        const { values, errors, touched, handleChange, setFieldValue } = props;

        return (
          <Form>
            <div className="w-full max-w-md mx-auto flex flex-col gap-5 p-8 rounded-3xl bg-white border border-gray-300 text-black shadow-lg">
              <h2 className="font-bold text-3xl text-center text-[#FFD700] tracking-tight">
                Create Account
              </h2>

              {errorMessage && (
                <div className="text-sm text-red-500 text-center">
                  {errorMessage}
                </div>
              )}

              {/* Firstname */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="firstname"
                  className="text-sm font-medium text-gray-700"
                >
                  First Name
                </label>
                <Input
                  id="firstname"
                  name="firstname"
                  value={values.firstname}
                  onChange={handleChange}
                  placeholder="Enter first name"
                  className="rounded-xl"
                />
                <div className="text-xs text-red-500 min-h-[1rem] ml-1">
                  {touched.firstname &&
                    errors.firstname &&
                    `*${errors.firstname}`}
                </div>
              </div>

              {/* Lastname */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="lastname"
                  className="text-sm font-medium text-gray-700"
                >
                  Last Name
                </label>
                <Input
                  id="lastname"
                  name="lastname"
                  value={values.lastname}
                  onChange={handleChange}
                  placeholder="Enter last name"
                  className="rounded-xl"
                />
                <div className="text-xs text-red-500 min-h-[1rem] ml-1">
                  {touched.lastname && errors.lastname && `*${errors.lastname}`}
                </div>
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                  className="rounded-xl"
                />
                <div className="text-xs text-red-500 min-h-[1rem] ml-1">
                  {touched.email && errors.email && `*${errors.email}`}
                </div>
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  className="rounded-xl"
                />
                <div className="text-xs text-red-500 min-h-[1rem] ml-1">
                  {touched.password && errors.password && `*${errors.password}`}
                </div>
              </div>

              {/* Role ID */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-700">
                  Role
                </label>
                <Select
                  value={values.role_id}
                  onValueChange={(val) => setFieldValue("role_id", val)}
                >
                  <SelectTrigger className="rounded-xl">
                    <SelectValue placeholder="Choose role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7d9c7b4d-2a7a-4d6d-9efb-57bdcb9f1a9c">
                      Event Organizer
                    </SelectItem>
                    <SelectItem value="a942e5c2-0a2b-49c8-8f28-8483ad3d2dc7">
                      User
                    </SelectItem>
                  </SelectContent>
                </Select>
                <div className="text-xs text-red-500 min-h-[1rem] ml-1">
                  {touched.role_id && errors.role_id && `*${errors.role_id}`}
                </div>
              </div>

              {/* Referral Code */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="referral_code"
                  className="text-sm font-medium text-gray-700"
                >
                  Referral Code (Optional)
                </label>
                <Input
                  id="referral_code"
                  name="referral_code"
                  value={values.referral_code}
                  onChange={handleChange}
                  placeholder="e.g. CODE123"
                  className="rounded-xl"
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="mt-4 w-full bg-[#FFD700] text-[#2D2D2D] font-bold hover:bg-[#e6c200] rounded-xl py-2"
              >
                Register
              </Button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
