export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  role: "farmer" | "buyer" | "admin";
  farmLocation?: string;
  farmType?: "Organic" | "Regular";
  lang?: "en" | "hi" | "kn";
  joined?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
