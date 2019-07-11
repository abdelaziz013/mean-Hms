import { Component, OnInit, Injectable } from '@angular/core';
import { ReceptionService } from './reception.service';
import { Reception } from './reception.model';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';



@Component({
  selector: 'app-reception',
  templateUrl: './reception.component.html',
  styleUrls: ['./reception.component.css']
})

@Injectable()
export class ReceptionComponent implements OnInit {
  reception: Reception;
  public mode = 'add';
  private id;

  constructor(public receptionService: ReceptionService, public route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMab: ParamMap) => {
      if (paramMab.has('id')) {
        this.mode = 'edit';
        this.id = paramMab.get('id');
        this.receptionService.getReceptionById(this.id).subscribe((data) => {
          this.reception = {
            _id: data.reception._id,
            name: data.reception.name,
            phone:data.reception.phone,
            address:data.reception.address,
            creator: data.reception.creator
          }
        })
      } else {
        this.mode = 'add'
      }
    })
  }

  onSaveReception(form: NgForm) {
    if (form.invalid) {
      return;
    }


    const reception: Reception = {
      _id: null,
      name: form.value.name,
      phone:form.value.phone,
      address:form.value.address,
      creator: null
    }
 
    if (this.mode === 'edit') {
      this.receptionService.updateReception(this.id, reception);
    } else {
      this.receptionService.addReception(reception);
    }




    form.resetForm();
  }




}
