import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Inject } from '@angular/core';
import { UserService } from 'src/app/service/user-service.service';
import { UserRequest } from 'src/app/user/user-request';
import { User } from 'src/app/user/user';
import { TranslateService } from '@ngx-translate/core';

/**
 * Component that displays a dialog for adding or updating users.
 */
@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-update-dialog.component.html',
  styleUrls: ['./add-update-dialog.component.css']
})
export class AddUpdateDialogComponent implements OnInit {

  userRequest: UserRequest = new UserRequest();
  updateUser!: User;
  add: boolean;

  /**
   * Constructor for AddUpdateDialogComponent.
   * When triggered, it gets correct user from database.
   * @param dialogRef Reference to the MatDialog.
   * @param data Data sent from the UserListComponent to retrieve the correct user from server.
   * @param userService Service which communicates with Spring boot backend through HttpClient.
   * @param translateService Used to translate the text in the alert dialog.
   */
  constructor(
      private dialogRef: MatDialogRef<AddUpdateDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private userService: UserService,
      private translateService: TranslateService
  ) {
        this.add = data.add;
        if (data.updateUserId !== -1) {
          this.userService.findUserById(data.updateUserId).subscribe(user => {
            this.updateUser = user;
          });
        }
  }

  ngOnInit(): void {
  }

  save(): void {
    this.dialogRef.close();
  }

  close(): void {
    this.dialogRef.close();
  }

  /**
   * Submits the new user to the server, closes the dialog.
   */
  onSubmit(): void {
    this.userService.addUser(this.userRequest).subscribe({
      next: (data) => {
        this.dialogRef.close();
        this.userService.findUsers();
      },
      error: (e) => {
        alert(e);
      },
      complete: () => {}
    });
  }

  /**
   * Submits the changes made to updatedUser to the server.
   * If error is encountered, it shows allert dialog.
   */
  onSubmitUpdate(): void {
    if (this.updateUser !== undefined) {
      this.userService.updateUser(this.updateUser).subscribe({
        next: (data) => {
          this.dialogRef.close();
          this.userService.findUsers();
        },
        error: (e) => {
          alert(this.translateService.instant('ERRORS.UPDATE'));
          location.reload();
        },
        complete: () => {}
      });
    }
  }
}
