import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsersService } from './users.service';
import { User } from './users.model';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Doctor } from '../doctors/doctor.model';
import { DoctorsService } from '../doctors/doctors.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  roles = ['Admin', 'Doctor', 'Reception', 'Nurse'];
  name: string;
  user: User;
  selected: string;
  doctorsList: Doctor[];
  mode = 'add'
  id;
 public doctorsSub: Subscription;
 itemPerPage = null;
  currentPage = null;
  doctor;
 
  constructor(public userService: UsersService,
              private route: ActivatedRoute,
              public doctorsService: DoctorsService,

              ) { }

  ngOnInit() {
    this.name = this.userService.getUserId();
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.mode = 'edit';
        this.id = paramMap.get('id');
        this.userService.getUserById(this.id).subscribe((data) => {
          this.user = data.user;
        })
      }
    })

    this.doctorsService.getDoctors(this.itemPerPage, this.currentPage);
    this.doctorsSub = this.doctorsService.getUpdatedDoctorsListener()
    .subscribe((doctorsData: { doctors: Doctor[], doctorsCount: number }) => {
      this.doctorsList = doctorsData.doctors;


    })


  }

  onAdduser(userForm: NgForm) {
    if (userForm.invalid) {
      return;
    }


    const user: User = {
      id: null,
      name: userForm.value.name,
      username: userForm.value.username,
      password: userForm.value.password,
      userRole: userForm.value.userRole,
      doctor:userForm.value.doctorId,
    }

    console.log(user)

    if (this.mode === 'edit') {
      this.userService.updateUser(this.id, user)
    } else {
      this.userService.createUser(user);
    }




  }


}
