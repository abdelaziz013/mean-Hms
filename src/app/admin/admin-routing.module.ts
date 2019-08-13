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
import { AdminGuard } from './users/admin-guard.guard';
import { NurseGuard } from './users/nurse.guard';

const routes: Routes = [

  { path: 'doctors',canActivate:[AuthGuard,AdminGuard], component: DoctorsComponent, data: { title: 'Admin/doctors' } },
  { path: 'doctorsList',canActivate:[AuthGuard,AdminGuard], component: DoctorsListComponent, data: { title: 'Admin/doctors List' } },
  { path: 'doctors/edit/:doctorId',canActivate:[AuthGuard,AdminGuard], component: DoctorsComponent, data: { title: 'Admin/Edit Doctor' } },
  { path: 'reception',canActivate:[AuthGuard,AdminGuard], component: ReceptionComponent, data: { title: 'Admin/Add Reception' } },
  { path: 'reception-list',canActivate:[AuthGuard,AdminGuard], component: ReceptionListComponent, data: { title: 'Admin/Reception List' } },
  { path: 'reception/edit/:id',canActivate:[AuthGuard,AdminGuard], component: ReceptionComponent, data: { title: 'Edit Reception' } },
  { path: 'add-nurse',canActivate:[AuthGuard,AdminGuard], component: AddNurseComponent, data: { title: 'Add Nurse' } },

  { path: 'nurses-list',canActivate:[AuthGuard,AdminGuard], component: NursListComponent, data: { title: 'Nurse List' } },
  { path: 'add-nurse/edit/:id',canActivate:[AuthGuard,AdminGuard], component: AddNurseComponent, data: { title: 'Edit Nurse' } },
  { path: 'add-nurse-shift',canActivate:[AuthGuard,AdminGuard], component: AddShiftComponent, data: { title: 'Add Nurse Shift' } },
  { path: 'nurseshift-list',canActivate:[AuthGuard,AdminGuard], component: NurseshiftListComponent, data: { title: 'Nurse-Shift List' } },
  { path: 'assign-nurseshift',canActivate:[AuthGuard,AdminGuard], component: AssignShiftComponent, data: { title: 'Assign Nurse Shift' } },
  { path: 'roster-list',canActivate:[AuthGuard,NurseGuard], component: NrosterListComponent, data: { title: 'Nurse Roster' } },
  { path: 'assign-nurseshift/:id',canActivate:[AuthGuard,AdminGuard], component: AssignShiftComponent, data: { title: 'Edit Nurse Roster' } },

  { path: 'opc',canActivate:[AuthGuard,AdminGuard], component: OpcComponent, data: { title: 'Add Opc' } },
  { path: 'opc-list',canActivate:[AuthGuard,AdminGuard], component: OpcListComponent, data: { title: 'Opcs list' } },
  { path: 'add-opcshift',canActivate:[AuthGuard,AdminGuard], component: AddOpcshiftComponent, data: { title: 'Add Opcs Shift' } },
  { path: 'opcshift-list',canActivate:[AuthGuard,AdminGuard], component: OpcShiftlistComponent, data: { title: 'Opcs Shift-list' } },
  { path: 'assign-opcshift',canActivate:[AuthGuard,AdminGuard], component: AssignOpcShiftComponent, data: { title: 'Assign Opcs-Shift' } },
  { path: 'opcroster-list',canActivate:[AuthGuard,AdminGuard], component: OpcrosterListComponent, data: { title: 'Opcs Roster' } },
  { path: 'opc-roster/edit/:id',canActivate:[AuthGuard,AdminGuard], component: AssignOpcShiftComponent, data: { title: 'Edit Opcs Roster' } },


  { path: 'services',canActivate:[AuthGuard,AdminGuard], component: ServicesComponent, data: { title: 'Add Service' } },
  { path: 'service-list',canActivate:[AuthGuard,AdminGuard], component: ServiceListComponent, data: { title: 'Service List' } },
  { path: 'services/edit/:id',canActivate:[AuthGuard,AdminGuard], component: ServicesComponent, data: { title: 'Edit Service' } },
  { path: 'room',canActivate:[AuthGuard,AdminGuard], component: RoomComponent, data: { title: 'Add Room' } },
  { path: 'room-list',canActivate:[AuthGuard,AdminGuard], component: RoomListComponent, data: { title: 'Room List' } },
  { path: 'room/:id',canActivate:[AuthGuard,AdminGuard], component: RoomComponent, data: { title: 'Edit Room' } },
  { path: 'medicine',canActivate:[AuthGuard,AdminGuard], component: MedicineComponent, data: { title: 'Add Medicine' } },
  { path: 'medicine/edit/:id',canActivate:[AuthGuard,AdminGuard], component: MedicineComponent, data: { title: 'Edit Medicine' } },
  { path: 'medicine-list',canActivate:[AuthGuard,AdminGuard], component: MedicineListComponent, data: { title: 'Medicine list' } },
  { path: 'users-list',canActivate:[AuthGuard,AdminGuard], component: UserListComponent, data: { title: 'User List' } },
  { path: 'edit-user/:id',canActivate:[AuthGuard,AdminGuard], component: UsersComponent, data: { title: 'Edit user' } },
  { path: 'users',canActivate:[AuthGuard,AdminGuard], component: UsersComponent, data: { title: 'Add User' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
