import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user-service.service';
import { MatPaginator } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '../../user/user';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddUpdateDialogComponent } from '../../dialogs/add-update-dialog/add-update-dialog.component';
import { Observable } from 'rxjs';
import { ConfDialogComponent } from 'src/app/dialogs/conf-dialog/conf-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';

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
  constructor(
    private userService: UserService, 
    public addDialog: MatDialog,
    private router: Router
  ) { }

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

  navToDetails(id: number): void {
    console.log(id);
    this.router.navigate(['user-info', id]);
  }

  openAddDialog(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      updateUserId: -1,
      add: true
    }

    this.addDialog.open(AddUpdateDialogComponent, dialogConfig);
  }

  openUpdateDialog(userId: number): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      updateUserId: userId,
      add: false
    };

    this.addDialog.open(AddUpdateDialogComponent, dialogConfig);
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

  doNothing(): void { }
}
