export type HealthResponse = {
  ok: boolean;
};

export type LoginRequestBody = {
  login: string;
  password: string;
};

export type LoginResponse = {
  user: {
    id: number;
    login: string;
  };
};
