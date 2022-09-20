import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Inject } from '@angular/core';
import { UserService } from 'src/app/service/user-service.service';
import { UserRequest } from 'src/app/user/user-request';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.css']
})
export class AddDialogComponent implements OnInit {

  userRequest: UserRequest = new UserRequest();

  constructor(
      private dialogRef: MatDialogRef<AddDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private userService: UserService) {
  }

  ngOnInit(): void {
  }

  save(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    console.log(this.userRequest);
    this.userService.addUser(this.userRequest).subscribe(data => {
      console.log(data)}, 
      err => {
        console.log(err);
      });
    this.dialogRef.close();
  }

  close(): void {
    this.dialogRef.close();
  }

}
