import {AppUser} from "./app-user";
import {Position} from "./position";

export interface Employee {
  id?: number;
  name?: string;
  birthday?: string;
  gender?: number;
  phoneNumber?: string;
  address?: string;
  email?: string;
  salary?: number;
  image?: string;
  isDeleted?: boolean;
  appUser?: AppUser;
  position?: Position
}
