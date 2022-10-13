import firebase from "firebase/auth";

export interface AuthProps {
  currentUser: firebase.User | null;
  login: (email: string, password: string) => Promise<firebase.UserCredential>;
  signup: (email: string, password: string) => Promise<firebase.UserCredential>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  verifyEmail: (user: firebase.User) => Promise<void>;
  loginWithGoogle: () => Promise<firebase.UserCredential>;
}

export interface UserProps {
  getTokens: () => string | number | undefined;
  checkTokenAvailablity: (costPerRequest: number) => boolean | undefined;
  updateUserTokens: (tokensUsed: number) => Promise<void>;
  getPlanType: () => "Free" | "Standard" | "Unlimited" | undefined;
  setUserInfo: (a: DropAiUser) => void;
  user: DropAiUser | null;
}

export interface DropAiUser {
  availableTokens: number;
  planType: "Free" | "Standard" | "Unlimited";
  numberOfRequests: number;
  paymentId?: string;
  endOfCycle?: string;
}

export interface BillingInfo {
  payment: {
    brand: string | undefined;
    ending: string | undefined;
  };
  billingInterval: "day" | "month" | "week" | "year";
  invoices: {
    period: {
      end: number;
      start: number;
    };
    plan: string | null;
    amount: number;
    invoiceId: string;
  }[];
}
