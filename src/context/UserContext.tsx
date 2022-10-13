import React, { useContext, useEffect } from "react";
import { DropAiUser, UserProps } from "../interfaces/interface";
import { createUser, getUser, updateTokens } from "../Requests";
import { authRequest } from "../utils/authenticationRequest";
import { AuthContext } from "./AuthContext";

export const UserContext = React.createContext<UserProps | null>(null);

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = React.useState<DropAiUser | null>(null);
  const authentication = React.useContext(AuthContext);

  React.useEffect(() => {
    if (authentication?.currentUser) {
      authRequest(authentication?.currentUser, getUser, {
        uid: authentication?.currentUser?.uid,
      }).then((response) => {
        setUser(response.result);
      });
    }
  }, [authentication]);

  const getTokens = () => {
    return user?.planType === "Standard" ? "∞" : user?.availableTokens;
  };
  // Returns true ? user has enough tokens
  const checkTokenAvailablity = (
    costPerRequest: number
  ): boolean | undefined => {
    const tokens = getTokens();
    if (user && tokens) {
      return user?.planType === "Standard"
        ? true
        : tokens >= costPerRequest
        ? true
        : false;
    }
  };

  const updateUserTokens = async (tokensUsed: number) => {
    if (authentication?.currentUser && user?.planType === "Free") {
      const response = await authRequest(
        authentication?.currentUser,
        updateTokens,
        {
          uid: authentication?.currentUser?.uid,
          tokensUsed,
        }
      );
      setUser(response.result);
    }
  };
  const getPlanType = () => user?.planType;
  const setUserInfo = (a: DropAiUser) => {
    setUser(a);
  };
  const value = {
    getTokens,
    checkTokenAvailablity,
    updateUserTokens,
    getPlanType,
    setUserInfo,
    user,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
