import { Observable, BehaviorSubject, of } from "rxjs";
import { DataSource } from '@angular/cdk/table';
import { User } from "../user/user";
import { UserService } from "./user-service.service"

export class UserDataSource implements DataSource<User> {
    private userSubject = new BehaviorSubject<User[]>([]);

    constructor(private userService: UserService) {}

    connect(): Observable<User[]> {
        return this.userSubject.asObservable();
    }

    disconnect(): void {
        this.userSubject.complete();
    }

    loadUsers(pageIndex = 0, pageSize = 5): void {
        this.userService.findUsers(pageIndex, pageSize)
        .subscribe( users => this.userSubject.next(users));
    }

    usersCount(): number { 
        return this.userSubject.getValue().length;
    }
}