export interface User {
  id: string;
  email: string;
  username: string;
}

export interface Classroom {
  id: number;
  title: string;
  description: string;
  capacity: number;
  created_date: string;
  invite: string;
  teacher: User;
}
