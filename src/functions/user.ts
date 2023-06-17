import {
  AccountTypes,
  InputUserDTO,
  SearchUserResult,
  UserType,
} from "../@types/UserType";
import api from "../api";

export async function createUser(input: InputUserDTO) {
  try {
    const response = await api.post("/users", { ...input });
    const token = response.data.token as string;

    return {
      user: response.data.data,
      token,
    };
  } catch (err) {
    return null;
  }
}

export async function signInUser(email: string, password: string) {
  try {
    const loginResponse = await api.post("/users/login", { email, password });
    const userResponse = await api.get("/users/me");
    const token = loginResponse.data.token as string;

    return {
      user: userResponse.data.data as UserType,
      token,
    };
  } catch (err) {
    return null;
  }
}

export async function getMe(): Promise<UserType | null> {
  try {
    const user = await api.get("/users/me");
    return user.data.data;
  } catch (err) {
    return null;
  }
}

export async function verifyEmailAvailability(email: string): Promise<boolean> {
  try {
    const response = await api.get(`/users/email-availability/${email}`);
    return response.data.data.available as boolean;
  } catch (err) {
    return false;
  }
}

export async function getUser(accountType: AccountTypes, email: string) {
  try {
    const response = await api.get(`/users/${accountType}/${email}`);

    const user = response.data.data.user;
    const status = response.data.data.status;

    return {
      ...user,
      status,
    } as SearchUserResult;
  } catch (err) {
    return null;
  }
}

export async function logout(): Promise<void> {
  try {
    await api.post("/users/logout");
  } catch (err) {}
}
