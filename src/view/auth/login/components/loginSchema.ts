import * as Yup from "yup";

export const userLoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Email is not valid")
    .trim()
    .required("Email cannot be empty"),
  password: Yup.string().trim().required("Password cannot be empty"),
});
