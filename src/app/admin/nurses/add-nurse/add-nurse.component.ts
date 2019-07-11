import { Component, OnInit, Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Nurse } from '../nurse.model';
import { NursesService } from '../nurses.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { UsersService } from '../../users/users.service';
import { Subscription } from 'rxjs';

@Injectable()

@Component({
  selector: 'app-add-nurse',
  templateUrl: './add-nurse.component.html',
  styleUrls: ['./add-nurse.component.css']
})
export class AddNurseComponent implements OnInit {
  nurse: Nurse;
  public mode = 'add';
  private id;
  userRole: string;
  private authListenerSubs: Subscription;




  constructor(private nurseService: NursesService,
              private route: ActivatedRoute,
              private router: Router,
              private userService: UsersService
      ) { }



  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.mode = 'edit';
        this.id = paramMap.get('id');
        this.nurseService.getbyId(this.id).subscribe((nursedata) => {
          this.nurse = {
            _id: nursedata.nurse._id,
            name: nursedata.nurse.name,
            phone: nursedata.nurse.phone,
            address: nursedata.nurse.address,
            creator: nursedata.nurse.creator
          }
        })
      } else {
        this.mode = 'add'
      }
    })


    this.userRole = this.userService.getRole();
    this.authListenerSubs = this.userService.getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userRole =this.userService.getRole();
      });



  }

  onSave(form: NgForm) {
    if (form.invalid) {
      return;
    }


    const nurse: Nurse = {
      _id: null,
      name: form.value.name,
      phone: form.value.phone,
      address: form.value.address,
      creator: null
    }

    if (this.mode === 'edit') {
      this.nurseService.updateNurse(nurse, this.id).subscribe(() => {
        this.router.navigate(['/admin/nurses-list']);
      })
    } else {
      this.nurseService.addNurse(nurse);

    }





  }

}
