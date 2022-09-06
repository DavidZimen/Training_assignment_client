import { Component, OnInit } from '@angular/core';
import { User } from '../user/user';
import { UserService } from 'src/app/service/user-service.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: User[] = [];

  /**
   * Constructor for UserListComponent.
   * @param userService - service which communicates with Spring boot backend through HttpClient
   */
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  public getUsers(): void {
    this.userService.findAllUsers().subscribe(
      (responseUsers: User[]) => {
        this.users = responseUsers},
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }
}
