import { CustomParameters, User, UserCredential } from "firebase/auth";

// Define the shape of the auth context value
export interface AuthContextType {
  user: User | undefined | null;
  error: Error | undefined;
  loading: boolean;
  signInWithGoogle: (
    scopes?: string[],
    customOAuthParameters?: CustomParameters
  ) => Promise<UserCredential | undefined>;
  createUserWithEmailPassword: (
    email: string,
    password: string
  ) => Promise<UserCredential | undefined>;
  logout: () => Promise<void>;
  signInWithEmailAndPassword: (
    email: string,
    password: string
  ) => Promise<UserCredential | undefined>;
}
