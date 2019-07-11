import { Component, OnInit } from '@angular/core';
import { MedicineService } from './medicine.service';
import { NgForm } from '@angular/forms';
import { Medicine } from './medicine.model';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-medicine',
  templateUrl: './medicine.component.html',
  styleUrls: ['./medicine.component.css']
})
export class MedicineComponent implements OnInit {
  medicine:Medicine;
  mode ='add'
  id:string

  constructor(private medicineService: MedicineService,
              private route: ActivatedRoute

    ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paraMab: ParamMap)=>{
      if(paraMab.has('id')){
        this.mode ='edit';
        this.id =paraMab.get('id');
        this.medicineService.getMedicineById(this.id).subscribe(data=>{
          this.medicine ={
            _id:data.medicine._id,
            name:data.medicine.name,
            cost:data.medicine.cost,
            creator:data.medicine.creator
          }
        })

      }
    })

  }

  onSaveMedicine(form: NgForm) {
    if (form.invalid) {
      return;
    }



    const medicine: Medicine={
      _id: null,
      name: form.value.name,
      cost: form.value.cost,
      creator: null
    }


    if (this.mode === 'edit') {
      this.medicineService.updateMedicine(this.id, medicine);
    } else {
      this.medicineService.addMedicine(medicine)
    }


    form.resetForm();


  }


  // last
}
