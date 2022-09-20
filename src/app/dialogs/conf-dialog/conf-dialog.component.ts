import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Inject } from '@angular/core';
import { UserService } from '../../service/user-service.service';

@Component({
  selector: 'app-conf-dialog',
  templateUrl: './conf-dialog.component.html',
  styleUrls: ['./conf-dialog.component.css']
})
export class ConfDialogComponent implements OnInit {

  id: number;

  constructor(
    private dialogRef: MatDialogRef<ConfDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService) {
      this.id = data.id;
}

  ngOnInit(): void {
    console.log(this.id);
  }

  onSubmit(): void {
    this.userService.deleteUser(this.id).subscribe(data => {});
    this.dialogRef.close();
  }

  close(): void {
    this.dialogRef.close();
  }
}
