import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { FlashMessagesModule } from 'angular2-flash-messages';
import { ChartsModule } from 'ng2-charts'
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './navigation/header/header.component';
import { AppRoutingModule } from './app.routing.module';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { AdminComponent } from './admin/admin.component';
import { DoctorsService } from './admin/doctors/doctors.service';
import { AuthInercepter } from './admin/users/auth-intercepter';
import { InpatientListComponent } from './reception/inpatient-list/inpatient-list.component';
import { OutpatientListComponent } from './reception/outpatient-list/outpatient-list.component';
import { ErrorInercepter } from './error-interceptor';
import { ErrorComponent } from './error/error/error.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ConfirmationDialogeComponent } from './confirmation-dialoge/confirmation-dialoge.component';
import { SharedModule } from './shared/shared.module';
import { NotAuthorizedComponent } from './not-authorized/not-authorized.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    SidenavListComponent,
    AdminComponent,
    ErrorComponent,
    NotFoundComponent,
    ConfirmationDialogeComponent,
    InpatientListComponent,
    OutpatientListComponent,
    NotAuthorizedComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FlashMessagesModule.forRoot(),
    ChartsModule,
    SharedModule  ],


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
