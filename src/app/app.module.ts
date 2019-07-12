import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { ChartsModule } from 'ng2-charts'
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgxPrintModule} from 'ngx-print';
import { MaterialModule } from './material.module';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './navigation/header/header.component';
import { AppRoutingModule } from './app.routing.module';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AdminComponent } from './admin/admin.component';
import { FormsModule, FormControl, ReactiveFormsModule } from '@angular/forms';
import { DoctorsService } from './admin/doctors/doctors.service';
import { AuthInercepter } from './admin/users/auth-intercepter';
import { PatientComponent } from './reception/patient/patient.component';
import { InpatientListComponent } from './reception/inpatient-list/inpatient-list.component';
import { OutpatientListComponent } from './reception/outpatient-list/outpatient-list.component';
import { DiagnosisComponent } from './doctors/diagnosis/diagnosis.component';
import { AddPrescriptionComponent } from './doctors/add-prescription/add-prescription.component';
import { PatientServicesComponent } from './doctors/patient-services/patient-services.component';
import { ShowCaseComponent } from './doctors/show-case/show-case.component';
import { ErrorInercepter } from './error-interceptor';
import { ErrorComponent } from './error/error/error.component';
import { AddBillComponent } from './reception/bill/add-bill/add-bill.component';
import { BillListComponent } from './reception/bill/bill-list/bill-list.component';
import { PrintBillComponent } from './reception/bill/print-bill/print-bill.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ConfirmationDialogeComponent } from './confirmation-dialoge/confirmation-dialoge.component';
import { ReceptionModule } from './reception/reception.module';











@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    SidenavListComponent,
    AdminComponent,
    InpatientListComponent,
    OutpatientListComponent,
    ErrorComponent,
    NotFoundComponent,
    ConfirmationDialogeComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    FlexLayoutModule,
    FormsModule,
    HttpClientModule,
    NgxMaterialTimepickerModule,
    ReactiveFormsModule,
    FlashMessagesModule.forRoot(),
    ChartsModule,
    NgxPrintModule,


  ],


  providers: [DoctorsService,
    {provide:HTTP_INTERCEPTORS,
      useClass:AuthInercepter,
      multi:true
    },
    {provide:HTTP_INTERCEPTORS,
      useClass:ErrorInercepter,
      multi:true
    },
    Title

  ],
  bootstrap: [AppComponent],
  entryComponents:[ErrorComponent,ConfirmationDialogeComponent]
})
export class AppModule { }
