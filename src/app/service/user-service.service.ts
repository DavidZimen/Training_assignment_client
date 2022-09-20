import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../user/user';
import { UserRequest } from '../user/user-request'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userUrl: string = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

   public findUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.userUrl}/user/all`)
  }

   public findUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.userUrl}/user/${id}`);
   }

   public addUser(userRequest: UserRequest): Observable<User> {
    return this.http.post<User>(`${this.userUrl}/user/add`, userRequest);
   }

   public updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.userUrl}/user/update`, user);
   }

   public deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.userUrl}/user/delete/${id}`);
   }
}
