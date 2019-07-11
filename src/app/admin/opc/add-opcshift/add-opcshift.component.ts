import { Component, OnInit } from '@angular/core';
import { OpcService } from '../opc.service';
import { NgForm } from '@angular/forms';
import { OpcShift } from '../opc-shift.model';

@Component({
  selector: 'app-add-opcshift',
  templateUrl: './add-opcshift.component.html',
  styleUrls: ['./add-opcshift.component.css']
})
export class AddOpcshiftComponent implements OnInit {
  shiftsName : string[]=['OP1','OP2','OP3','OP4']

  constructor(private opcService: OpcService) { }

  ngOnInit() {
  }

  onSave(form: NgForm){
    if(form.invalid){
      return;
    }
    const shift: OpcShift ={
      _id: null,
      shiftName:form.value.shiftName,
      startTime:form.value.start,
      endTime:form.value.end,
      creator:null
    }

    this.opcService.addOpcShift(shift)
    form.resetForm();


  }

}
