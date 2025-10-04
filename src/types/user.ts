export interface User {
  id: number;
  email: string;
  password: string;
  name: string;
  role: 'admin' | 'user' | 'guest';
  story: string;
}