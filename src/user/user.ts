import { Address } from "src/app/address/address";

type Nullable<T> = T | null;

export class User {
    id: number = -1;
    personalNumber: number = -1;
    name: string = '';
    surname: string= '';
    birthDate: number = -1;
    address: Nullable<Address> = null;

    constructor() {}
}
