import { Component, OnInit, OnDestroy } from '@angular/core';
import { Opc } from '../opc.model';
import { OpcService } from '../opc.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material';
import { ConfirmationDialogeComponent } from 'src/app/confirmation-dialoge/confirmation-dialoge.component';

@Component({
  selector: 'app-opc-list',
  templateUrl: './opc-list.component.html',
  styleUrls: ['./opc-list.component.css']
})
export class OpcListComponent implements OnInit, OnDestroy{

  displayedColumns: string[] = ['index', 'name', 'actionsColumn'];
  opcList: Opc[] = []
  opcSub: Subscription;


  constructor(private opcService: OpcService, public dialog: MatDialog) { }

  ngOnInit() {
    this.opcService.getOpc();
    this.opcSub = this.opcService.opcUpdateListener()
      .subscribe((opcData: { opc: Opc[] }) => {
        this.opcList = opcData.opc;
      })
  }

  onDelete(id: string, name: string) {
    const dialogRef = this.dialog.open(ConfirmationDialogeComponent, {
      width: '450px',
      data: `Are you sure you want to delete ${name}?`
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.opcService.deleteOpc(id)
          .subscribe(() => {
            this.opcService.getOpc()
          }
          )
      }
    })
  }


ngOnDestroy(): void {
 this.opcSub.unsubscribe()
}



}
