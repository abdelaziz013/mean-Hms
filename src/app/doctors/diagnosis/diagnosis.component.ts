import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DiagnosisServiceService } from '../diagnosis-service.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Diagnosis } from '../diagnosis.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-diagnosis',
  templateUrl: './diagnosis.component.html',
  styleUrls: ['./diagnosis.component.css']
})
export class DiagnosisComponent implements OnInit {
  patientDiagnosis: Diagnosis;
  id: string;
  diagnosisSub: Subscription;

  constructor(private diagnosisService: DiagnosisServiceService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMab: ParamMap) => {
      this.id = paramMab.get('id')
    })

    this.diagnosisService.getDiagnosis(this.id);
    this.diagnosisSub = this.diagnosisService.diagnsisupdatlistenr()
                      .subscribe((responseData)=>{
                        this.patientDiagnosis =responseData.diagnosis;
                      })

  }

  onSaveDiagnosis(form: NgForm) {
    if (form.invalid) {
      return;
    }

    if(this.patientDiagnosis){
      const editdiagnosis: Diagnosis = {
        _id: this.patientDiagnosis._id,
        symptoms: form.value.symptoms,
        signs: form.value.signs,
        pastHistory: form.value.pHistory,
        diagnosis: form.value.diagnosis,
        creator: null
      }

      this.diagnosisService.updateDiagnosis(this.id, editdiagnosis)

    } else {
      const diagnosis: Diagnosis = {
        _id: null,
        symptoms: form.value.symptoms,
        signs: form.value.signs,
        pastHistory: form.value.pHistory,
        diagnosis: form.value.diagnosis,
        creator: null
      }
      this.diagnosisService.addDignosis(this.id,diagnosis)

    }


    form.resetForm()

  }




// last
}
