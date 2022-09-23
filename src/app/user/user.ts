import { Address } from "src/app/address/address";

export interface User {
    id: number;
    personalNumber: number;
    name: string;
    surname: string;
    birthDate: Date;
    address: Address;
    version: number;
}
