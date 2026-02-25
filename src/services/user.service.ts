import users from "../mocks/users.json";
import type { UserProfile } from "../types/user";

export const fetchUsers = async (): Promise<UserProfile[]> => {
  await new Promise((res) => setTimeout(res, 500));
  return users as UserProfile[];
};