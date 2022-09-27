import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Inject } from '@angular/core';
import { UserService } from 'src/app/service/user-service.service';
import { UserRequest } from 'src/app/user/user-request';
import { User } from 'src/app/user/user';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { TranslateService } from '@ngx-translate/core';

export const APP_DATE_FORMATS = {
  parse: {
      dateInput: 'DD.MM.YYYY',
  },
  display: {
      dateInput: 'DD.MM.YYYY',
      monthYearLabel: 'MMMM YYYY',
      dateA11yLabel: 'LL',
      monthYearA11yLabel: 'MMMM YYYY'}
}

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-update-dialog.component.html',
  styleUrls: ['./add-update-dialog.component.css'],
  providers: [{ provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }]
})
export class AddUpdateDialogComponent implements OnInit {

  userRequest: UserRequest = new UserRequest();
  updateUser!: User;

  add: boolean;

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
            console.log(user.version);
          });
        }
  }

  ngOnInit(): void {
  }

  save(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.userService.addUser(this.userRequest).subscribe(data => {});
    this.dialogRef.close();
    this.userService.findUsers();
  }

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

  close(): void {
    this.dialogRef.close();
  }
}
