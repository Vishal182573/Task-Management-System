export interface CustomInputProps {
  title: string;
  id: string;
  className?: string;
  type?: string;
  value?: string | number | readonly string[] | undefined;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface Officer {
  name: string;
  contact: string;
  email: string;
  password?: string;
  photograph?: File | null; // Assuming can be optional

  // TODO: workingAddress -> address
  workingAddress: {
    house: string;
    street: string;
    city: string;
    state: string;
    postalCode: string;
  };
  role?: Role;
}

export interface LoginData {
  email: String;
  password: String;
}

export type Role = "ADMIN" | "LG" | "OFFICER";

export interface Institute {
  _id: number;
  name: string;
  logo: string;
  nodalOfficer: Officer;
  reportingOfficer: Officer;
  tasks?: string[]; // Assuming tasks is an array of strings
}

export interface Task {
  taskId?: string;
  title: string;
  description: string;
  startingDate: Date | undefined;
  endingDate: Date | undefined;
  assignedTo: string;
  status: "IN-PENDING" | "COMPLETED" | "DELAYED";
}

export interface UserType {
  userId: string;
  name: string;
  email: string;
  role: string;
  address: string;
  contact: string;
  photographUri: string;
  createdAt: string;
}

export interface UserContextType {
  user: UserType | null;
  setUser: (user: UserType | null) => void;
  isLogged: Boolean;
  loading: Boolean;
  setIsLogged: (value: boolean) => void;
}

// export interface Notification {
//   text: string;
//   name: string;
//   date: Date;
//   subject: string;
//   enotification: string;
// }

export interface Notification {
  _id: string;
  taskId: String;
  title: String;
  description: String;
  status: String;
  type: String;
  institute: String;
  isRead: Boolean;
  created: Date;
}
