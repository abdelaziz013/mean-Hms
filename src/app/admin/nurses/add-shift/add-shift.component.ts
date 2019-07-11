import { Component, OnInit, Injectable } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { NursesService } from '../nurses.service';
import { NurseShift } from '../nurseShift.model';


@Injectable()
@Component({
  selector: 'app-add-shift',
  templateUrl: './add-shift.component.html',
  styleUrls: ['./add-shift.component.css']
})
export class AddShiftComponent implements OnInit {
  shiftsName : string[]= ['NR1', 'NR2', 'NR3',' NR4']

  shift : NurseShift


  constructor(private nurseService: NursesService) { }

  ngOnInit() {

  }

  onSave(form: NgForm){
    
    if(form.invalid){
      return;
    }
    const shift ={
      _id: null,
      shiftName:form.value.shiftName,
      startTime:form.value.start,
      endTime:form.value.end,
      creator:null
    }

    this.nurseService.addShift(shift);
    form.resetForm();
  }
}
