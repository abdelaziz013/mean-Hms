import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { DoctorsListComponent } from './doctors/doctors-list/doctors-list.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { UsersComponent } from './users/users.component';
import { ReceptionComponent } from './reception/reception.component';
import { ReceptionListComponent } from './reception/reception-list/reception-list.component';
import { NursesComponent } from './nurses/nurses.component';
import { NursListComponent } from './nurses/nurs-list/nurs-list.component';
import { AddNurseComponent } from './nurses/add-nurse/add-nurse.component';
import { NurseshiftListComponent } from './nurses/nurseshift-list/nurseshift-list.component';
import { AddShiftComponent } from './nurses/add-shift/add-shift.component';
import { AssignShiftComponent } from './nurses/assign-shift/assign-shift.component';
import { NrosterListComponent } from './nurses/nroster-list/nroster-list.component';
import { OpcComponent } from './opc/opc.component';
import { OpcListComponent } from './opc/opc-list/opc-list.component';
import { ServicesComponent } from './services/services.component';

import { ServiceListComponent } from './services/service-list/service-list.component';
import { RoomListComponent } from './room/room-list/room-list.component';
import { MedicineComponent } from './medicine/medicine.component';
import { MedicineListComponent } from './medicine/medicine-list/medicine-list.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { MaterialModule } from '../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RoomComponent } from './room/room.component';
import { FormsModule } from '@angular/forms';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { AddOpcshiftComponent } from './opc/add-opcshift/add-opcshift.component';
import { OpcShiftlistComponent } from './opc/opc-shiftlist/opc-shiftlist.component';
import { AssignOpcShiftComponent } from './opc/assign-opc-shift/assign-opc-shift.component';
import { OpcrosterListComponent } from './opc/opcroster-list/opcroster-list.component';

@NgModule({
  declarations: [
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
    AddOpcshiftComponent,
    OpcShiftlistComponent,
    AssignOpcShiftComponent,
    OpcrosterListComponent,

    ServicesComponent,
    ServiceListComponent,
    RoomListComponent,
    MedicineComponent,
    MedicineListComponent,
    UserListComponent,
    RoomComponent
  ],

  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    NgxMaterialTimepickerModule,


  ]
})
export class AdminModule { }
