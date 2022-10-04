import { Address } from "src/app/address/address";

/**
 * Simple interface to store attributes of a user.
 */
export interface User {
    id: number;
    personalNumber: number;
    name: string;
    surname: string;
    birthDate: Date;
    address: Address;
    version: number;
}
