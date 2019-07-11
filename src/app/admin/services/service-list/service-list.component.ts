import { Component, OnInit, OnDestroy } from '@angular/core';
import { Service } from '../service.model';
import { Subscription } from 'rxjs';
import { ServiceService } from '../service.service';
import { PageEvent, MatTableDataSource, MatDialog } from '@angular/material';
import { ConfirmationDialogeComponent } from 'src/app/confirmation-dialoge/confirmation-dialoge.component';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.css']
})
export class ServiceListComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['index', 'name', 'category', 'cost', 'actionsColumn'];
  serviceList: Service[] = []
  serviceListLength = 0;
  itemPerPage = 10;
  currentPge = 1;
  pageSizeOption = [10, 15, 20];
  dataSource;

  serviceSub: Subscription;

  constructor(private sreviceService: ServiceService, public dialog: MatDialog) { }

  ngOnInit() {
    this.sreviceService.getServiceList(this.itemPerPage, this.currentPge);
    this.serviceSub = this.sreviceService.getServiceUpdateListener()
      .subscribe((response) => {
        this.serviceList = response.service;
        this.serviceListLength = response.maxCount;
        this.dataSource = new MatTableDataSource(response.service);
      })

  }

  onChangPage(event: PageEvent) {
    this.itemPerPage = event.pageSize;
    this.currentPge = event.pageIndex + 1;
    this.sreviceService.getServiceList(this.itemPerPage, this.currentPge);
  }

  onDelete(id: string, name: string) {
    const dialogRef = this.dialog.open(ConfirmationDialogeComponent, {
      width: '450px',
      data: `Are you sure you want to delete ${name}?`
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.sreviceService.deleteService(id).subscribe(() => {
          this.sreviceService.getServiceList(this.itemPerPage, this.currentPge);
        })
      }
    })
  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  ngOnDestroy() {
    this.serviceSub.unsubscribe();
  }
}
