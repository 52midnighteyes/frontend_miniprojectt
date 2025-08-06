export interface IRegisterParams {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role_id:
    | "7d9c7b4d-2a7a-4d6d-9efb-57bdcb9f1a9c"
    | "a942e5c2-0a2b-49c8-8f28-8483ad3d2dc7";
  referral_code: string;
}

export type IVerifyUserParam = string;

export interface ILoginParams {
  email: string;
  password: string;
}

export interface IResetPasswordParams {
  email: string;
  old_password: string;
  new_password: string;
}

export interface IForgotPasswordParams {
  password: string;
  token: string;
}

export type IForgotPasswordReqParam = string;

export interface ILoginPayload {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
  avatar: string | null;
  role: {
    id: string;
    name: string;
  };
}

export interface IRegisterResponse {
  message: string;
  data: {
    response: ILoginPayload;
    token: string;
  };
}

export interface ILoginResponse {
  message: string;
  data: {
    response: {
      id: string;
      email: string;
      firstname: string;
      lastname: string;
      avatar: string | null;
      role: {
        name: string;
        id: string;
      };
    };
    token: string;
  };
}
