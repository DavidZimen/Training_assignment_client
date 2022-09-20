import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user-service.service';
import { MatPaginator } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '../../user/user';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddDialogComponent } from '../../dialogs/add-dialog/add-dialog.component';
import { Observable } from 'rxjs';
import { ConfDialogComponent } from 'src/app/dialogs/conf-dialog/conf-dialog.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users = new MatTableDataSource<User>();
  infoUser!: Observable<User>;
  totalElements: number = 0;
  columnsToDisplay = ['personalNumber', 'name', 'surname', 'actions'];

  @ViewChild(MatPaginator, {static: true})paginator!: MatPaginator;


  /**
   * Constructor for UserListComponent.
   * @param userService - service which communicates with Spring boot backend through HttpClient
   */
  constructor(private userService: UserService, public addDialog: MatDialog) { }

  ngOnInit(): void {
  }
  
  ngAfterViewInit(): void {
    this.loadUsers();

    this.addDialog.afterAllClosed.subscribe(() => {
      this.loadUsers();
    });
  }


  loadUsers(): void {
    this.userService.findUsers().subscribe(response => {
      this.users.data = response;
      this.totalElements = response.length;
      this.users.paginator = this.paginator;
    });
  }

  getUserInRowInfo(row: any): void {
    this.infoUser = this.userService.findUserById(row.id);
  }

  openAddDialog(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      id: 1,
      title: 'Angular For Beginners'
    };

    this.addDialog.open(AddDialogComponent, dialogConfig);
  }

  onDeleteButton(userId: number): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      id: userId
    };

    this.addDialog.open(ConfDialogComponent, dialogConfig);
  }
}
