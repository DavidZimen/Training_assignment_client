import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user-service.service';
import { MatPaginator } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import { tap } from 'rxjs';
import { UserDataSource } from '../service/user-data-source';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users!: UserDataSource;
  totalElements: number = 0;
  columnsToDisplay = ['personalNumber', 'name', 'surname', 'birthDate', 'street', 'houseNumber', 'city'];

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  /**
   * Constructor for UserListComponent.
   * @param userService - service which communicates with Spring boot backend through HttpClient
   */
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.users = new UserDataSource(this.userService);
    this.users.loadUsers();
  }

  ngAfterViewInit() {
    this.paginator?.page
      .pipe(
        tap(() => this.loadUsersPage())
      )
      .subscribe();
  }

  loadUsersPage() {
    this.users?.loadUsers(this.paginator?.pageIndex, this.paginator?.pageSize);
  }
}
