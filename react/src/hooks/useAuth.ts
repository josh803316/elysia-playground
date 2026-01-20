import { useAuth as useClerkAuth } from "@clerk/clerk-react";

export const useAuth = () => {
  const { isSignedIn } = useClerkAuth();
  return { isSignedIn };
};
