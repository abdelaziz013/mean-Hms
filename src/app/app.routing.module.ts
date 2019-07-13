import { NgModule } from '@angular/core';
import {  Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {AdminComponent} from './admin/admin.component';
import { AuthGuard } from './admin/users/auth.guard';
import { InpatientListComponent } from './reception/inpatient-list/inpatient-list.component';
import { OutpatientListComponent } from './reception/outpatient-list/outpatient-list.component';
import { NotFoundComponent } from './not-found/not-found.component';








const routes: Routes = [
    {path : '', component : LoginComponent,data: {title: 'HMS Login'}},
    {path : 'home', component : AdminComponent,canActivate:[AuthGuard],data: {title: 'HMS Home'}},
    {path: 'admin', loadChildren: './admin/admin.module#AdminModule'},
    {path: 'reception', loadChildren: './reception/reception.module#ReceptionModule'},
    {path: 'doctor', loadChildren: './doctors/doctor.module#DoctorModule'},
    {path: 'patient' , component:InpatientListComponent, canActivate:[AuthGuard],data: {title: 'InPatient-List'}},
    {path: 'reception/out-patient' , component:OutpatientListComponent, canActivate:[AuthGuard],data: {title: 'OutPatient-List'}},
    {path: '**', component:NotFoundComponent,data: {title: 'Not Found'} }
];




@NgModule({
  imports : [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthGuard]

})
export class AppRoutingModule {}
