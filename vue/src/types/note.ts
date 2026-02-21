export interface Note {
  id: string;
  title: string;
  content: string;
  userId: string | null;
  isPublic: string;
  createdAt: string;
  updatedAt: string;
  user?: {
    firstName?: string;
    lastName?: string;
    email?: string;
  };
}
