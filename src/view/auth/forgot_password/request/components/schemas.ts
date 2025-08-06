import * as Yup from "yup";

export const requestForgotPassword = Yup.object().shape({
  email: Yup.string().trim().required("Email cannot be empty"),
});
