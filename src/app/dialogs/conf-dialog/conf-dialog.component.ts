import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Inject } from '@angular/core';
import { UserService } from '../../service/user-service.service';
import { TranslateService } from '@ngx-translate/core';

/**
 * Component for the confirming that user is about to be deleted.
 */
@Component({
  selector: 'app-conf-dialog',
  templateUrl: './conf-dialog.component.html',
  styleUrls: ['./conf-dialog.component.css']
})
export class ConfDialogComponent implements OnInit {

  id: number;

  /**
   * 
   * @param dialogRef Reference to the MatDialog.
   * @param data Data sent from the UserListComponent to retrieve the correct user from server.
   * @param userService Service which communicates with Spring boot backend through HttpClient.
   * @param translateService Used to translate the text in the dialog.
   */
  constructor(
    private dialogRef: MatDialogRef<ConfDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService,
    private translateService: TranslateService) {
      this.id = data.id;
    }

  ngOnInit(): void { }

  /**
   * Submits the changes in the server.
   */
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
  }

  close(): void {
    this.dialogRef.close();
  }
}
