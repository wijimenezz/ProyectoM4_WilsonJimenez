import type { User } from "firebase/auth";

export const getUserDisplayName = (user: User | null): string => {
  if (!user) return "Guest";

  if (user.displayName?.trim()) {
    return user.displayName;
  }

  if (user.email) {
    return user.email.split("@")[0];
  }

  return "User";
};

export const getUserInitials = (user: User | null): string => {
  const name = getUserDisplayName(user);

  const words = name.trim().split(" ");

  if (words.length >= 2) {
    return `${words[0][0]}${words[1][0]}`.toUpperCase();
  }

  return name.substring(0, 2).toUpperCase();
};
