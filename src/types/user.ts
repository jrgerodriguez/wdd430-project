export interface User {
  id: number;
  email: string;
  password: string;
  // Add new fields below - NEED UPDATE THE DATABASE TO REFLECT THESE CHANGES
  name: string;
  role: 'admin' | 'user' | 'seller';
  story?: string;
}