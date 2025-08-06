import * as Yup from "yup";

export const userRegisterSchema = Yup.object().shape({
  firstname: Yup.string().trim().required("firstname cannot be empty"),

  lastname: Yup.string().trim().required("lastname cannot be empty"),

  email: Yup.string()
    .trim()
    .email("Invalid email format")
    .required("email cannot be empty"),

  password: Yup.string()
    .trim()
    .min(6, "Password must be at least 6 characters")
    .max(12, "Password max characters are 12")
    .matches(/^\S+$/, "Password must not contain spaces")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(/[^A-Za-z0-9]/, "Password must contain at least one symbol")
    .required("password cannot be empty"),

  role_id: Yup.string().trim().required("role is required"),

  referral_code: Yup.string().trim(),
});
