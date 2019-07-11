import { Component, OnInit } from '@angular/core';
import { NgForm} from '@angular/forms';
// import moment from 'moment';
import * as moment from 'moment';
import { NursesService } from '../nurses.service';
import { NurseShift } from '../nurseShift.model';
import { Nurse } from '../nurse.model';
import { Subscription } from 'rxjs';
import { NurseRoster } from '../roster.model';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';





@Component({
  selector: 'app-assign-shift',
  templateUrl: './assign-shift.component.html',
  styleUrls: ['./assign-shift.component.css']

})
export class AssignShiftComponent implements OnInit {
  // toppings= new FormControl();
  moment: any;
  dateFormate : any;
  itemPerPage = null;
  currentPge = null;
  nursesList: Nurse[]= [];
  shiftList : NurseShift[]= [];
  nurseRoster: NurseRoster;
  public mode='add';
  private id;
  private nurseSub : Subscription;
  private shiftSub: Subscription;


  constructor(private nurseService: NursesService,private route: ActivatedRoute,
              private router: Router )
              {
              this.moment = moment();
  }



  ngOnInit() {
    this.nurseService.getNurseList(this.itemPerPage,this.currentPge);
    this.nurseSub = this.nurseService.getupdatenurselistener()
      .subscribe((nurseData:{nurses: Nurse[],nursesCount: number})=>{
        this.nursesList = nurseData.nurses;
      })

    this.nurseService.getShift();
    this.shiftSub = this.nurseService.getShiftUpdate()
    .subscribe((data:{nurseShift: NurseShift[]})=>{
      this.shiftList =data.nurseShift;
    })

    this.route.paramMap.subscribe((paramMap:ParamMap)=>{
      if(paramMap.has('id')){
        this.mode ='edit';
        this.id = paramMap.get('id');
        this.nurseService.getRosterById(this.id).subscribe((rosterData=>{
          this.nurseRoster ={
            _id:rosterData.roster._id,
            date:moment(rosterData.roster.date).format('YYYY-MM-DD'),
            nurseShift:rosterData.roster.nurseShift,
            nurse:rosterData.roster.nurse,
            creator:rosterData.roster.creator
          }
        })
        )
      }else{

        this.mode='add'
        console.log(this.mode)
      }

    });




  }

  onSave(form: NgForm){
    // this.dateFormate = moment(form.value).format('YYYY-MM-DD')
    if(form.invalid){
      return;
    }
    const roster ={
      _id:null,
      date:form.value.shiftdate,
      nurseShift:form.value.shiftName,
      nurse:form.value.nurse,
      creator:null
    }

    if(this.mode === 'edit'){
      this.nurseService.updateRoster(roster,this.id)
        .subscribe((updated=>{
        this.router.navigate(['/admin/roster-list']);
        }))
    }else{
      this.nurseService.addRoster(roster);
    }





    form.resetForm();


  }

}
