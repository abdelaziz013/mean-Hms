import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DoctorsComponent } from './doctors/doctors.component';
import { AuthGuard } from './users/auth.guard';
import { DoctorsListComponent } from './doctors/doctors-list/doctors-list.component';
import { ReceptionComponent } from './reception/reception.component';
import { ReceptionListComponent } from './reception/reception-list/reception-list.component';
import { AddNurseComponent } from './nurses/add-nurse/add-nurse.component';
import { NursListComponent } from './nurses/nurs-list/nurs-list.component';
import { AddShiftComponent } from './nurses/add-shift/add-shift.component';
import { NurseshiftListComponent } from './nurses/nurseshift-list/nurseshift-list.component';
import { AssignShiftComponent } from './nurses/assign-shift/assign-shift.component';
import { NrosterListComponent } from './nurses/nroster-list/nroster-list.component';
import { OpcComponent } from './opc/opc.component';
import { OpcListComponent } from './opc/opc-list/opc-list.component';
import { AddOpcshiftComponent } from './opc/add-opcshift/add-opcshift.component';
import { OpcShiftlistComponent } from './opc/opc-shiftlist/opc-shiftlist.component';
import { AssignOpcShiftComponent } from './opc/assign-opc-shift/assign-opc-shift.component';
import { OpcrosterListComponent } from './opc/opcroster-list/opcroster-list.component';
import { ServicesComponent } from './services/services.component';
import { ServiceListComponent } from './services/service-list/service-list.component';
import { RoomComponent } from './room/room.component';
import { RoomListComponent } from './room/room-list/room-list.component';
import { MedicineComponent } from './medicine/medicine.component';
import { MedicineListComponent } from './medicine/medicine-list/medicine-list.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [

  { path: 'doctors', component: DoctorsComponent, canActivate: [AuthGuard], data: { title: 'Admin/doctors' } },
  { path: 'doctorsList', component: DoctorsListComponent, canActivate: [AuthGuard], data: { title: 'Admin/doctors List' } },
  { path: 'doctors/edit/:doctorId', component: DoctorsComponent, canActivate: [AuthGuard], data: { title: 'Admin/Edit Doctor' } },
  { path: 'reception', component: ReceptionComponent, canActivate: [AuthGuard], data: { title: 'Admin/Add Reception' } },
  { path: 'reception-list', component: ReceptionListComponent, canActivate: [AuthGuard], data: { title: 'Admin/Reception List' } },
  { path: 'reception/edit/:id', component: ReceptionComponent, canActivate: [AuthGuard], data: { title: 'Edit Reception' } },
  { path: 'add-nurse', component: AddNurseComponent, canActivate: [AuthGuard], data: { title: 'Add Nurse' } },
  { path: 'nurses-list', component: NursListComponent, canActivate: [AuthGuard], data: { title: 'Nurse List' } },
  { path: 'add-nurse/edit/:id', component: AddNurseComponent, canActivate: [AuthGuard], data: { title: 'Edit Nurse' } },
  { path: 'add-nurse-shift', component: AddShiftComponent, canActivate: [AuthGuard], data: { title: 'Add Nurse Shift' } },
  { path: 'nurseshift-list', component: NurseshiftListComponent, canActivate: [AuthGuard], data: { title: 'Nurse-Shift List' } },
  { path: 'assign-nurseshift', component: AssignShiftComponent, canActivate: [AuthGuard], data: { title: 'Assign Nurse Shift' } },
  { path: 'roster-list', component: NrosterListComponent, canActivate: [AuthGuard], data: { title: 'Nurse Roster' } },
  { path: 'assign-nurseshift/:id', component: AssignShiftComponent, canActivate: [AuthGuard], data: { title: 'Edit Nurse Roster' } },
  { path: 'opc', component: OpcComponent, canActivate: [AuthGuard], data: { title: 'Add Opc' } },
  { path: 'opc-list', component: OpcListComponent, canActivate: [AuthGuard], data: { title: 'Opcs list' } },
  { path: 'add-opcshift', component: AddOpcshiftComponent, canActivate: [AuthGuard], data: { title: 'Add Opcs Shift' } },
  { path: 'opcshift-list', component: OpcShiftlistComponent, canActivate: [AuthGuard], data: { title: 'Opcs Shift-list' } },
  { path: 'assign-opcshift', component: AssignOpcShiftComponent, canActivate: [AuthGuard], data: { title: 'Assign Opcs-Shift' } },
  { path: 'opcroster-list', component: OpcrosterListComponent, canActivate: [AuthGuard], data: { title: 'Opcs Roster' } },
  { path: 'opc-roster/edit/:id', component: AssignOpcShiftComponent, canActivate: [AuthGuard], data: { title: 'Edit Opcs Roster' } },
  { path: 'services', component: ServicesComponent, canActivate: [AuthGuard], data: { title: 'Add Service' } },
  { path: 'service-list', component: ServiceListComponent, canActivate: [AuthGuard], data: { title: 'Service List' } },
  { path: 'services/edit/:id', component: ServicesComponent, canActivate: [AuthGuard], data: { title: 'Edit Service' } },
  { path: 'room', component: RoomComponent, canActivate: [AuthGuard], data: { title: 'Add Room' } },
  { path: 'room-list', component: RoomListComponent, canActivate: [AuthGuard], data: { title: 'Room List' } },
  { path: 'room/:id', component: RoomComponent, canActivate: [AuthGuard], data: { title: 'Edit Room' } },
  { path: 'medicine', component: MedicineComponent, canActivate: [AuthGuard], data: { title: 'Add Medicine' } },
  { path: 'medicine/edit/:id', component: MedicineComponent, canActivate: [AuthGuard], data: { title: 'Edit Medicine' } },
  { path: 'medicine-list', component: MedicineListComponent, canActivate: [AuthGuard], data: { title: 'Medicine list' } },
  { path: 'users-list', component: UserListComponent, canActivate: [AuthGuard], data: { title: 'User List' } },
  { path: 'edit-user/:id', component: UsersComponent, canActivate: [AuthGuard], data: { title: 'Edit user' } },
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard], data: { title: 'Add User' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
