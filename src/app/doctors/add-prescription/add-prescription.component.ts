import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Medicine } from 'src/app/admin/medicine/medicine.model';
import { MedicineService } from 'src/app/admin/medicine/medicine.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Prescription } from './prescribtion.model';
import { PrescriptionServiceService } from './prescription-service.service';


@Component({
  selector: 'app-add-prescription',
  templateUrl: './add-prescription.component.html',
  styleUrls: ['./add-prescription.component.css']
})
export class AddPrescriptionComponent implements OnInit,OnDestroy{

  medicineList: Medicine[] = [];
  private medListSub: Subscription;
  itemPerPage = null;
  currentPge = null;
  id: string;

  constructor(private fb: FormBuilder,
              private medicineService: MedicineService,
              private route: ActivatedRoute,
              private presService: PrescriptionServiceService,
              private router: Router
  ) { }

  prscibtionForm: FormGroup;

  ngOnInit() {

    this.prscibtionForm = new FormGroup({
      prescribtion: new FormControl(null, Validators.required)
    });

    // array of prescription
    this.prscibtionForm = this.fb.group({
      prescribtion: this.fb.array([
        this.fb.group({
          _id: '',
          medicine: '',
          dose: ''
        })
      ])
    })


    // medicineList
    this.medicineService.getMedicineList(this.itemPerPage, this.currentPge)
    this.medListSub = this.medicineService.getMedUpdateListner()
      .subscribe((medListData: { medicine: Medicine[], maxCount: number }) => {
        this.medicineList = medListData.medicine;
      })

    // get id
    this.route.paramMap.subscribe((paramMab: ParamMap) => {
      this.id = paramMab.get('id');
    })

  }

  // get presceiption array
  get prescription() {
    return this.prscibtionForm.get('prescribtion') as FormArray;
  }

  // add precription
  addPresceiption() {
    this.prescription.push(this.fb.group({
      _id: '',
      medicine: '',
      dose: ''
    }
    ));
  }

  // remove
  removePresceiption(index) {
    this.prescription.removeAt(index);
  }


  onSubmit() {
    this.prescription.value.forEach(element => {
      const prescreption: Prescription = {
        _id: null,
        medicine: element.medicine,
        dose: element.dose,
        creator: null
      }

      this.presService.addPresceibtion(this.id,prescreption)
    });

  

  }

  ngOnDestroy(){
    this.medListSub.unsubscribe();
  }
  // last
}
