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
import { DoctorsComponent } from './admin/doctors/doctors.component';
import { DoctorsListComponent } from './admin/doctors/doctors-list/doctors-list.component';
import { FormsModule, FormControl, ReactiveFormsModule } from '@angular/forms';
import { DoctorsService } from './admin/doctors/doctors.service';
import { UsersComponent } from './admin/users/users.component';
import { AuthInercepter } from './admin/users/auth-intercepter';
import { ReceptionComponent } from './admin/reception/reception.component';
import { ReceptionListComponent } from './admin/reception/reception-list/reception-list.component';
import { NursesComponent } from './admin/nurses/nurses.component';
import { NursListComponent } from './admin/nurses/nurs-list/nurs-list.component';
import { AddNurseComponent } from './admin/nurses/add-nurse/add-nurse.component';
import { AddShiftComponent } from './admin/nurses/add-shift/add-shift.component';
import { NurseshiftListComponent } from './admin/nurses/nurseshift-list/nurseshift-list.component';
import { AssignShiftComponent } from './admin/nurses/assign-shift/assign-shift.component';
import { NrosterListComponent } from './admin/nurses/nroster-list/nroster-list.component';
import { OpcComponent } from './admin/opc/opc.component';
import { OpcListComponent } from './admin/opc/opc-list/opc-list.component';
import { AddOpcshiftComponent} from './admin/opc/add-opcshift/add-opcshift.component'
import { ServicesComponent } from './admin/services/services.component';
import { ServiceListComponent } from './admin/services/service-list/service-list.component';
import { RoomComponent } from './admin/room/room.component';
import { RoomListComponent } from './admin/room/room-list/room-list.component';
import { MedicineComponent } from './admin/medicine/medicine.component';
import { MedicineListComponent } from './admin/medicine/medicine-list/medicine-list.component';
import { UserListComponent } from './admin/users/user-list/user-list.component';
import { PatientComponent } from './reception/patient/patient.component';
import { InpatientListComponent } from './reception/inpatient-list/inpatient-list.component';
import { OutpatientListComponent } from './reception/outpatient-list/outpatient-list.component';
import { DiagnosisComponent } from './doctors/diagnosis/diagnosis.component';
import { AddPrescriptionComponent } from './doctors/add-prescription/add-prescription.component';
import { PatientServicesComponent } from './doctors/patient-services/patient-services.component';
import { ShowCaseComponent } from './doctors/show-case/show-case.component';
import { ErrorInercepter } from './error-interceptor';
import { ErrorComponent } from './error/error/error.component';
import { OpcShiftlistComponent } from './admin/opc/opc-shiftlist/opc-shiftlist.component';
import { AssignOpcShiftComponent } from './admin/opc/assign-opc-shift/assign-opc-shift.component';
import { OpcrosterListComponent } from './admin/opc/opcroster-list/opcroster-list.component';
import { AddBillComponent } from './reception/bill/add-bill/add-bill.component';
import { BillListComponent } from './reception/bill/bill-list/bill-list.component';
import { PrintBillComponent } from './reception/bill/print-bill/print-bill.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ConfirmationDialogeComponent } from './confirmation-dialoge/confirmation-dialoge.component';










@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    SidenavListComponent,
    AdminComponent,
    DoctorsComponent,
    DoctorsListComponent,
    UsersComponent,
    ReceptionComponent,
    ReceptionListComponent,
    NursesComponent,
    NursListComponent,
    AddNurseComponent,
    AddShiftComponent,
    NurseshiftListComponent,
    AssignShiftComponent,
    NrosterListComponent,
    OpcComponent,
    OpcListComponent,
    ServicesComponent,
    ServiceListComponent,
    RoomComponent,
    RoomListComponent,
    MedicineComponent,
    MedicineListComponent,
    UserListComponent,
    PatientComponent,
    InpatientListComponent,
    OutpatientListComponent,

    DiagnosisComponent,
    AddPrescriptionComponent,
    PatientServicesComponent,
    ShowCaseComponent,
    ErrorComponent,
    AddOpcshiftComponent,
    OpcShiftlistComponent,
    AssignOpcShiftComponent,
    OpcrosterListComponent,
    AddBillComponent,
    BillListComponent,
    PrintBillComponent,
    NotFoundComponent,
    ConfirmationDialogeComponent,





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
    NgxPrintModule
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
