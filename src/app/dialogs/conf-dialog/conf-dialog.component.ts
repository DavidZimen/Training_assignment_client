import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Inject } from '@angular/core';
import { UserService } from '../../service/user-service.service';
import { TranslateService } from '@ngx-translate/core';

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
    private userService: UserService,
    private translateService: TranslateService) {
      this.id = data.id;
    }

  ngOnInit(): void { }

  onSubmit(): void {
    this.userService.deleteUser(this.id).subscribe({
      next: (data) => {
        this.dialogRef.close();
        this.userService.findUsers();
      },
      error: (e) => {
        alert(this.translateService.instant('ERRORS.DELETE'));
        location.reload();
      },
      complete: () => {}
    });
    this.dialogRef.close();
  }

  close(): void {
    this.dialogRef.close();
  }
}
