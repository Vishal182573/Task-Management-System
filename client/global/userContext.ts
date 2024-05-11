import React from 'react';

export type UserType = {
  userId: string;
  name: string;
  email: string;
  role: string;
  address: string;
  contact: string;
  photoGraphUri: string;
  createdAt: string;
};

type UserContextType = {
  user: UserType | null;
  setUser: (user: UserType | null) => void;
};

export const UserContext = React.createContext<UserContextType>({
  user: null,
  setUser: () => {},
});
