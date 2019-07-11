import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-confirmation-dialoge',
  templateUrl: './confirmation-dialoge.component.html',
  styleUrls: ['./confirmation-dialoge.component.css']
})
export class ConfirmationDialogeComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogeComponent>,
    @Inject(MAT_DIALOG_DATA) public message: string

  ) { }

  ngOnInit() {
  }
  
  onNoClick(): void {
    this.dialogRef.close();
  }

}
