import { NgModule } from '@angular/core';
import {MatSidenavModule, MatToolbarModule, MatIconModule,
  MatButtonModule, MatExpansionModule , MatListModule, MatTabsModule, MatCardModule,
  MatFormFieldModule, MatInputModule , MatSelectModule, MatTableModule, MatButtonToggleModule,
  MatProgressSpinnerModule,MatPaginatorModule,MatDatepickerModule,MatNativeDateModule,MatTooltipModule,
  MatDialogModule

} from '@angular/material';



@NgModule({
  // imports : [MatSidenavModule, MatToolbarModule, MatIconModule,
  //   MatButtonModule, MatExpansionModule , MatListModule, MatTabsModule, MatCardModule,
  //   MatFormFieldModule, MatInputModule , MatSelectModule, MatTableModule, MatButtonToggleModule,
  //   MatProgressSpinnerModule,MatPaginatorModule,MatDatepickerModule,MatNativeDateModule,MatTooltipModule,
  //   MatDialogModule
  // ],
  exports: [ MatSidenavModule, MatToolbarModule, MatIconModule, MatButtonModule, MatExpansionModule ,
    MatListModule, MatTabsModule, MatCardModule ,
    MatFormFieldModule, MatInputModule , MatSelectModule, MatTableModule, MatButtonToggleModule,
    MatProgressSpinnerModule,MatPaginatorModule,MatDatepickerModule,MatNativeDateModule,MatTooltipModule,
    MatDialogModule

  ]

})

export class MaterialModule {}
