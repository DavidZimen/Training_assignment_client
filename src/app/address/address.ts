import { User } from "../user/user";

/**
 * Simple interface for storing a data of given user.
 */
export interface Address {
    id: number;
    street: string;
    houseNumber: number;
    city: string;
    user: User;
}