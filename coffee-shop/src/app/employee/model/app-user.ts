import {Employee} from "./employee";

export interface AppUser {
  id?: number;
  userName?: string;
  creationDate?: string;
  isDeleted?: boolean;
  employee?: Employee;
}
