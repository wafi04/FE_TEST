// contexts/AuthContext.tsx
import { createContext, useContext, useEffect, useState } from "react";
import { useProfile } from "../../hooks/auth/useProfile";
import { UserData } from "../../types/user";

interface AuthContextType {
  isAuthenticated: boolean;
  user: UserData | null;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: user, isLoading } = useProfile();

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        user: user?.data || null,
        isLoading,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
