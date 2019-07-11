import { Component, OnInit, OnDestroy } from '@angular/core';
import { Reception } from '../reception.model';
import { ReceptionService } from '../reception.service';
import { Subscription } from 'rxjs';
import { PageEvent,MatTableDataSource, MatDialog  } from '@angular/material';
import { ConfirmationDialogeComponent } from 'src/app/confirmation-dialoge/confirmation-dialoge.component';

@Component({
  selector: 'app-reception-list',
  templateUrl: './reception-list.component.html',
  styleUrls: ['./reception-list.component.css']
})
export class ReceptionListComponent implements OnInit,OnDestroy {

  constructor(public receptionService:ReceptionService,  public dialog: MatDialog) { }

  displayedColumns : string[] =['index','name','phone','address','actionsColumn'];
  receptionListLength =0;
  itemPerPage = 10;
  currentPge = 1;
  pageSizeOption = [10, 15, 20];
  receptionList : Reception []=[];
  private receptionSub : Subscription;
  dataSource;

  ngOnInit() {
    this.receptionService.getReception(this.itemPerPage,this.currentPge);
    this.receptionSub = this.receptionService.getUpdatedReceptionListener()
        .subscribe((receptionData:{reception: Reception[], receptionCount: number})=>{
          this.receptionList = receptionData.reception;
          this.dataSource = new MatTableDataSource(receptionData.reception);
          this.receptionListLength =receptionData.receptionCount;
        })

  }

  onChangPage( pageData: PageEvent) {
    this.currentPge = pageData.pageIndex + 1;
    this.itemPerPage = pageData.pageSize;
    this.receptionService.getReception(this.itemPerPage, this.currentPge);


  }

  onDelete(id: string,receptionName:string){
    const dialogRef = this.dialog.open(ConfirmationDialogeComponent, {
      width: '350px',
      data: `Are you sure you want to delete ${receptionName}?`
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.receptionService.deleteReception(id).subscribe(()=>{
          this.receptionService.getReception(this.itemPerPage,this.currentPge);
        });
      }
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  ngOnDestroy(){
    this.receptionSub.unsubscribe()
  }


}
