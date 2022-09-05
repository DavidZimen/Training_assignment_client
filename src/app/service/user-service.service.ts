import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/user/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userUrl: string;

  constructor(private http: HttpClient) {
    this.userUrl = 'http://localhost:8080/user'
   }

   public findAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.userUrl)
   }

   public findUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.userUrl}/${id}`)
   }

   public addUser(user: User) {
    return this.http.post<User>(this.userUrl, user)
   }

   public updateUser(user: User) {
    return this.http.put<User>(`${this.userUrl}/${user.id}`, user)
   }

   public deleteUser(id: number) {
    return this.http.delete<User>(`${this.userUrl}/${id}`)
   }
}
