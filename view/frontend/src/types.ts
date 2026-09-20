export interface User {
  id: number;
  name: string;
  email: string;
  city?: string;
  age?: number;
  phone?: string;
  skill?: string;
  role: "ADMIN" | "USER" | "EMPLOYEE" | string;
  created_at?: string;
}

export interface NewsItem {
  id: number;
  title: string;
  image: string | null;
  event: string;
  author_id: number;
  author_name: string | null;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface ServiceItem {
  id: number;
  name: string;
  description: string;
  image: string | null;
  creator_id: number;
  creator_name: string | null;
  created_at: string;
}

export interface HiringItem {
  id: number;
  name: string;
  email: string;
  age: number;
  skill: string;
  city: string;
  resume: string;
  created_at: string;
  user_name: string | null;
}
