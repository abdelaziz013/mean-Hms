import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RoomService } from './room.service';
import { Room } from './room.model';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {
  roomType: string[] = ['Classic', 'VIP'];
  mode = 'Add'
  room: Room;
  private  id;


  constructor(private roomService: RoomService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMab: ParamMap) => {
      if (paramMab.has('id')) {
        this.mode = 'edit';
        this.id = paramMab.get('id');
        this.roomService.getRoomById(this.id)
          .subscribe((data) => {
            this.room = data.room
          })
      }else{
        this.mode='add'
      }
    });

  }

  onSaveRoom(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const room: Room = {
      _id: null,
      roomType: form.value.type,
      roomNumber: form.value.number,
      roomCost: form.value.cost,
      roomStatus: 'empty',
      creator: null
    }


    if(this.mode === 'edit'){
      console.log('edit')
      this.roomService.updateRoom(this.id,room)
        .subscribe(()=>{
          this.router.navigate(['/admin/room-list'])
        })
    }else{
      this.roomService.addRoom(room);
    }




    form.resetForm()


  }

  // last
}






