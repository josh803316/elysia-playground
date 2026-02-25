export interface Note {
  id: string | number;
  title: string;
  content: string;
  userId?: string | number | null;
  isPublic: string;
  createdAt: string;
  updatedAt: string;
  user?: {
    firstName?: string;
    lastName?: string;
    email?: string;
  };
}
