import { Injectable } from '@angular/core';
import { Room } from './room.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
const BACKEND_URL = environment.apiURL;

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
    this.http.post<{ room: Room }>(BACKEND_URL+'/room/add-room', room)
      .subscribe((response) => {
        this.router.navigate(['/admin/room-list'])
      })
  }

  // get room List

  getRoomList(pageSize: number, currentPage: number) {
    const queryParams = `?pagesize=${pageSize}&page=${currentPage}`;
    this.http.get<{ room: Room[], maxCount: number }>(BACKEND_URL+'/room/room-list' + queryParams)
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
    this.http.get<{ emptyRoom: Room[] }>(BACKEND_URL+'/room/emptyroom-list')
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
    return this.http.get<{ room: Room }>(BACKEND_URL+'/room/' + id)
  }

  // update room by id
  updateRoom(id: string, room: Room) {
    return this.http.put(BACKEND_URL+'/room/edit-room/' + id, room);
  }

  //  delete room
  deleteRoom(id: string) {
    return this.http.delete(BACKEND_URL+'/room/del-room/' + id)
  }




}
