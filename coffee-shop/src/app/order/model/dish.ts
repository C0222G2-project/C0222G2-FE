import { DishType } from "./dish-type";

export interface Dish {
    id: number;
    code: string;
    name: string;
    price: number;
    image: string;
    creationDate: Date;
    dishType: DishType;
}
