/**
 * Class to make the request to the server to creare a new user with a given attributes.
 */
export class UserRequest {
    name: string | undefined;
    surname: string | undefined;
    birthDate: string | undefined;
    street: string | undefined;
    houseNumber: number | undefined;
    city: string | undefined;

    constructor() {};
}