export interface LoginReq {
  email: string;
  password: string;
}

export interface LoginRes {
  token: string;
}

export interface RegisterReq {
  email: string;
  password: string;
}

export interface RegisterRes {
  id: number;
  token: string;
}
