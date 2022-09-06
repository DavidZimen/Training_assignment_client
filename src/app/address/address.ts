import { User } from "../user/user";


export interface Address {
    id: number;
    street: string;
    number: number;
    city: string;
    user: User;
}