import { User } from "../user/user";


export interface Address {
    id: number;
    street: string;
    houseNumber: number;
    city: string;
    user: User;
}