export type User = {
  id: number;
  name: string;
  email: string;
  branch_id: number;
  branch: string;
  role_id: number;
  role: string;
  password: string;
  password2?: string;
};
