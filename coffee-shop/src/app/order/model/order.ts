import { Bill } from "./bill";
import { CoffeTable } from "./coffe-table";
import { Dish } from "./dish";
import { Employee } from "./employee";

export interface Order {
    id: number;
    code: string;
    quantity: number;
    coffeeTable: CoffeTable;
    bill: Bill;
    employee: Employee;
    dish: Dish;
}
