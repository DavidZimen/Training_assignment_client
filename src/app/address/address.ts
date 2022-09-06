import { User } from "../user/user";


export interface Address {
    id: number;
    psc: string;
    street: string;
    number: number;
    city: string;
    user: User;
}