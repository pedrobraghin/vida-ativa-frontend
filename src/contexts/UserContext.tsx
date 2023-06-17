import CookieManager from "@react-native-cookies/cookies";
import { createContext, useEffect, useState } from "react";

import {
  createUser,
  signInUser,
  getMe,
  verifyEmailAvailability,
} from "../functions/user";
import Config from "../../config/config.json";
import { InputUserDTO, UserType } from "../@types/UserType";

interface UserContextType {
  isLoggedIn: boolean;
  setIsLoggedIn(value: boolean): void;
  user: UserType;
  setUser: (user: Partial<UserType>) => void;
  getMe(): Promise<UserType | null>;
  createUser(user: InputUserDTO): Promise<void>;
  login(email: string, password: string): Promise<boolean>;
  logout(): void;
  token?: string;
  setToken(token: string): void;
  verifyEmailAvailability(email: string): Promise<boolean>;
  loadUser(): Promise<void>;
}

export const UserContext = createContext<UserContextType>(
  {} as UserContextType
);

interface UserContextProviderProps {
  children: React.ReactNode;
}

function useInitialState() {
  const [user, setUser] = useState<UserType>({} as UserType);
  const [token, setToken] = useState<string | undefined>();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function handleSetUser(user: Partial<UserType>) {
    setUser((prev) => {
      return { ...prev, ...user };
    });
  }

  async function login(email: string, password: string) {
    const response = await signInUser(email, password);

    if (!response) {
      setIsLoggedIn(false);
      return false;
    }

    const { token, user } = response;

    setUser(user);
    setToken(token);
    setIsLoggedIn(true);
    return true;
  }

  function logout() {
    setIsLoggedIn(false);
    setUser({} as UserType);
  }

  async function handleCreateUser(input: InputUserDTO) {
    const response = await createUser(input);

    if (!response) {
      return;
    }

    const { token, user } = response;

    setUser(user);
    setToken(token);
    setIsLoggedIn(true);
  }

  async function loadUser() {
    const user = await getMe();
    if (!user) {
      return;
    }

    const storedCookies = await CookieManager.get(Config.api_url);
    const token = storedCookies["jwt"].value;

    if (token) {
      setToken(token);
    }

    setUser(user);
    setIsLoggedIn(true);
  }

  return {
    user,
    setUser: handleSetUser,
    isLoggedIn,
    setIsLoggedIn,
    createUser: handleCreateUser,
    getMe,
    loadUser,
    login,
    logout,
    token,
    setToken,
    verifyEmailAvailability,
  };
}

export default function UserContextProvider({
  children,
}: UserContextProviderProps) {
  const data = useInitialState();
  const { loadUser } = data;

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <UserContext.Provider value={{ ...data }}>{children}</UserContext.Provider>
  );
}
