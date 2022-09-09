import firebase from "firebase/auth";

export interface AuthProps {
  currentUser: firebase.User | null;
  login: (email: string, password: string) => Promise<firebase.UserCredential>;
  signup: (email: string, password: string) => Promise<firebase.UserCredential>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}
