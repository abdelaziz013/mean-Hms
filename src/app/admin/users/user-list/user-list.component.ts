import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../users.model';
import { UsersService } from '../users.service';
import { Subscription } from 'rxjs';
import { PageEvent, MatTableDataSource, MatDialog } from '@angular/material';
import { ConfirmationDialogeComponent } from 'src/app/confirmation-dialoge/confirmation-dialoge.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['index', 'name', 'username', 'userRole', 'actionsColumn']
  userListLength = 0;
  userList: User[] = [];
  pageSizeOption = [10, 15, 20];
  itemPerPage = 10;
  currentPge = 1;
  userListSub: Subscription;
  dataSource;

  constructor(private userService: UsersService, public dialog: MatDialog) { }

  ngOnInit() {
    this.userService.getUserList(this.itemPerPage, this.currentPge);
    this.userListSub = this.userService.getUserListUpdatListener()
      .subscribe((listData: { users: User[], maxCount: number }) => {
        this.userList = listData.users,
          this.userListLength = listData.maxCount;
        this.dataSource = new MatTableDataSource(listData.users);

      })
  }


  onChangPage(event: PageEvent) {
    this.itemPerPage = event.pageSize;
    this.currentPge = event.pageIndex + 1;
    this.userService.getUserList(this.itemPerPage, this.currentPge);
  }

  onDelete(id: string,name:string) {
    const dialogRef = this.dialog.open(ConfirmationDialogeComponent, {
      width: '450px',
      data: `Are you sure you want to delete ${name}?`
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.deleteUser(id).subscribe(() => {
          this.userService.getUserList(this.itemPerPage, this.currentPge);
        });
      }
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy() {
    this.userListSub.unsubscribe();
  }

}
