import { Component, OnInit,Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Doctor } from './doctor.model';
import { DoctorsService } from './doctors.service';


@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css'],

})

@Injectable()
export class DoctorsComponent implements OnInit {

  doctorSpeciality: string[] =['surgery','Internal Medicine','E.N.T','Orthopedics'];
  doctorRank: string[]=['GP','Specialist','Consultant']

  doctor: Doctor;
  public mode = 'addDoctor';
  private doctorId: string;




  constructor( public doctorService: DoctorsService, public route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('doctorId')) {
        this.mode = 'edit';
        this.doctorId = paramMap.get('doctorId');
        this.doctorService.getDoctor(this.doctorId).subscribe(doctorData=>{
            this.doctor = {
              id: doctorData.doctor._id,
              name: doctorData.doctor.name,
              phone: doctorData.doctor.phone,
              email: doctorData.doctor.email,
              speciality: doctorData.doctor.speciality,
              rank: doctorData.doctor.rank,
              creator:doctorData.doctor.creator
            };
          });
      } else {
        this.mode = 'addDoctor';
        this.doctorId = null;
      }
    });
  }
  onSaveDoctor(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const doctor: Doctor = {
      id: null,
      name: form.value.name,
      phone: form.value.phone,
      email: form.value.email,
      speciality: form.value.speciality,
      rank: form.value.rank,
      creator:null
    };

    if(this.mode === 'addDoctor'){
      this.doctorService.addDoctor(doctor);
    } else{
      this.doctorService.updateDoctor(this.doctorId, doctor)
    }

    form.resetForm();

  }

}
