import { User } from "src/user/user";

type Nullable<T> = T | null;

export class Address {
    id: number = -1;
    psc: string = '';
    street: string = '';
    number: number = -1;
    city: string = '';
    user: Nullable<User> = null;
}