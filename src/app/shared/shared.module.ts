import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InpatientListComponent } from '../reception/inpatient-list/inpatient-list.component';
import { OutpatientListComponent } from '../reception/outpatient-list/outpatient-list.component';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPrintModule } from 'ngx-print';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPrintModule,
    NgxMaterialTimepickerModule,
    FlexLayoutModule,
    FormsModule,
  ],
  exports:[

    MaterialModule,
    FormsModule,
    NgxPrintModule,
    NgxMaterialTimepickerModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ]
})
export class SharedModule { }
