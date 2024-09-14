import React, { ReactNode, createContext, useContext } from "react";
import { useAuthState, useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";
import { CustomParameters, User, UserCredential } from "firebase/auth";

// Define the shape of the auth context value
interface AuthContextType {
  user: User | undefined | null;
  error: Error | undefined;
  loading: boolean;
  signInWithGoogle: (
    scopes?: string[],
    customOAuthParameters?: CustomParameters
  ) => Promise<UserCredential | undefined>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function AuthProvider({ children }: { children: ReactNode }) {
  const [user, loading, error] = useAuthState(auth);
  const [signInWithGoogle] = useSignInWithGoogle(auth);

  const logout = () => auth.signOut();

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        signInWithGoogle,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export { AuthProvider, useAuth };
