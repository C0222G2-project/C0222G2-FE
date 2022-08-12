import {DishType} from "./dish-type";

export interface Dish {
  id?: number;
  code?: string;
  creation_date?: string;
  img?: string;
  is_deleted?: boolean;
  name?: string;
  price?: number;
  dishType?: DishType;
}
