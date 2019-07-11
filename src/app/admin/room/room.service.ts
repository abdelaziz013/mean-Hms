import { Injectable } from '@angular/core';
import { Room } from './room.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private roomList: Room[] = []
  private roomUpdate = new Subject<{ room: Room[], maxCount: number }>();

  private emptyRoomlist: Room[] = [];
  private emptyroomUpdate = new Subject<{ emptyRoom: Room[] }>();


  constructor(private http: HttpClient, private router: Router) { }

  // add room
  addRoom(room: Room) {
    this.http.post<{ room: Room }>('http://localhost:3000/room/add-room', room)
      .subscribe((response) => {
        this.router.navigate(['/admin/room-list'])
      })
  }

  // get room List

  getRoomList(pageSize: number, currentPage: number) {
    const queryParams = `?pagesize=${pageSize}&page=${currentPage}`;
    this.http.get<{ room: Room[], maxCount: number }>('http://localhost:3000/room/room-list' + queryParams)
      .subscribe((response) => {
        this.roomList = response.room;
        this.roomUpdate.next({
          room: [...this.roomList],
          maxCount: response.maxCount
        })
      })
  }

  getRoomUpdateListener() {
    return this.roomUpdate.asObservable()
  }


  // get empty room
  getEmptyRoomList() {
    this.http.get<{ emptyRoom: Room[] }>('http://localhost:3000/room/emptyroom-list')
      .subscribe((response) => {
        this.emptyRoomlist= response.emptyRoom;

        console.log(this.emptyRoomlist)
        this.emptyroomUpdate.next({
          emptyRoom: [...this.emptyRoomlist]
        })
      })
  }

  emptyRoomUpdateListener() {
    return this.emptyroomUpdate.asObservable()
  }


  // get room by iid
  getRoomById(id: string) {
    return this.http.get<{ room: Room }>('http://localhost:3000/room/' + id)
  }

  // update room by id
  updateRoom(id: string, room: Room) {
    return this.http.put('http://localhost:3000/room/edit-room/' + id, room);
  }

  //  delete room
  deleteRoom(id: string) {
    return this.http.delete('http://localhost:3000/room/del-room/' + id)
  }




}
