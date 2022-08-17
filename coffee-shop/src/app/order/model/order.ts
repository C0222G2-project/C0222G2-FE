import { Bill } from "./bill";
import { CoffeeTable } from "./CoffeeTable";
import { Dish } from "./dish";
import { Employee } from "./employee";

export interface Order {
    quantity: number;
    coffeeTable: CoffeeTable;
    bill: Bill;
    employee: Employee;
    dish: Dish;
}
