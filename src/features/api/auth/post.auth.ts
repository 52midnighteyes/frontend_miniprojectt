import axios from "axios";
import {
  IForgotPasswordParams,
  ILoginParams,
  ILoginResponse,
  IRegisterParams,
  IRegisterResponse,
} from "@/types/auth.types";

// LOGIN
export async function LoginService(
  params: ILoginParams
): Promise<ILoginResponse> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    console.log(apiUrl);
    const response = await axios.post<ILoginResponse>(
      `${apiUrl}/api/auth/login`,
      {
        email: params.email,
        password: params.password,
      }
    );
    console.log(response);
    return response.data;
  } catch (err) {
    throw err;
  }
}

// REGISTER
export async function RegisterService(
  params: IRegisterParams
): Promise<IRegisterResponse> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    console.log(apiUrl);
    const response = await axios.post<IRegisterResponse>(
      `${apiUrl}/api/auth/register`,
      {
        firstname: params.firstname,
        lastname: params.lastname,
        email: params.email,
        password: params.password,
        role_id: params.role_id,
        referral_code: params.referral_code || "",
      }
    );

    console.log(response);
    return response.data;
  } catch (err) {
    throw err;
  }
}

export async function requestForgotPasswordService(email: { email: string }) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    console.log(apiUrl);
    const response = await axios.post(
      `${apiUrl}/api/auth/forgot-password`,
      email
    );

    return response;
  } catch (err) {
    throw err;
  }
}

export async function ResetPasswordByRequestService(
  params: IForgotPasswordParams
) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const response = await axios.patch(
      `${apiUrl}/api/auth/forgot-password`,
      { password: params.password },
      {
        headers: {
          Authorization: `Bearer ${params.token}`,
        },
      }
    );

    return response;
  } catch (err) {
    throw err;
  }
}

export async function VerifyUserService(params: { id: string; token: string }) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const response = await axios.patch(
      `${apiUrl}/api/auth/verify`,
      {
        id: params.id,
      },
      {
        headers: {
          Authorization: `Bearer ${params.token}`,
        },
      }
    );

    return response;
  } catch (err) {
    throw err;
  }
}
