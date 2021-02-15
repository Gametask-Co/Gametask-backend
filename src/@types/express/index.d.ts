declare namespace Express {
  export interface Request {
    user: {
      id: string;
      teacher?: string;
      student?: string;
    };
  }
}
