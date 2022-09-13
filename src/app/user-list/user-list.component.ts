import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user-service.service';
import { MatPaginator } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import { tap } from 'rxjs';
import { NgForm } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '../user/user';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users = new MatTableDataSource<User>();
  totalElements: number = 0;
  columnsToDisplay = ['personalNumber', 'name', 'surname', 'birthDate', 'street', 'houseNumber', 'city'];

  @ViewChild(MatPaginator, {static: true})paginator!: MatPaginator;

  /**
   * Constructor for UserListComponent.
   * @param userService - service which communicates with Spring boot backend through HttpClient
   */
  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }
  
  ngAfterViewInit(): void {
    this.loadUsers();
    this.users.paginator = this.paginator;
  }


  loadUsers() {
    this.userService.findUsers().subscribe(response => {
      this.users.data = response;
      this.totalElements = response.length;
    });
  }

  onAddUser(addForm: NgForm): void {

  }
}
