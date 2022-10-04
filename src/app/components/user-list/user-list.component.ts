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
import { Router } from '@angular/router';

/**
 * 
 */
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  providers: [UserService]
})
export class UserListComponent implements OnInit {

  users = new MatTableDataSource<User>();
  infoUser!: Observable<User>;
  totalElements: number = 0;
  columnsToDisplay = ['personalNumber', 'name', 'surname', 'actions'];

  @ViewChild(MatPaginator, {static: true})paginator!: MatPaginator;


  /**
   * Constructor for UserListComponent.
   * @param userService Service which communicates with Spring boot backend through HttpClient
   * @param addDialog Dialog for adding or updating users.
   * @param router Router to navigate between components.
   */
  constructor(
    private userService: UserService, 
    public addDialog: MatDialog,
    private router: Router
  ) { 
    this.router.canceledNavigationResolution = 'computed';
  }

  ngOnInit(): void {
    
  }
  
  ngAfterViewInit(): void {
    this.loadUsers();

    this.addDialog.afterAllClosed.subscribe(() => {
      this.loadUsers();
    });
  }

  /**
   * Method to retrieve users from backend through userService.
   */
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

  /**
   * Opens AddUpdateDialogComponent with blank fields.
   * Triggered when clicked on the addButton.
   */
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

  /**
   * Opens AddUpdateDialogComponent with prefilled data based on the userId.
   * Triggered when clicked on updateButton in the last column of the table.
   * @param userId Id of a selected user from the table.
   */
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

  /**
   * Opens ConfDialogComponent to warn user he is about to delete from the database.
   * Triggered when clicked on deleteButton in the last column of the table.
   * @param userId Id of the user which is going to be deleted.
   */
  onDeleteButton(userId: number): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      id: userId
    };

    this.addDialog.open(ConfDialogComponent, dialogConfig);
  }

  /**
   * Filtering the table based on the criteria.
   * @param event 
   */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.users.filter = filterValue.trim().toLowerCase();
  }
}
