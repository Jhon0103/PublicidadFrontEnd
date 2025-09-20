import { APP_INITIALIZER } from '@angular/core';
import { UserContextService, userContextInitializer } from './Modulo-seguridad/Services/user-context.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule }  from '@angular/common/http';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

//ANGULAR MATERIAL
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTableModule } from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import {MatTreeModule} from '@angular/material/tree';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTabsModule} from '@angular/material/tabs';
import {MatRadioModule} from '@angular/material/radio';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {MatSortModule} from '@angular/material/sort';
import { MatNativeDateModule } from '@angular/material/core'; // para usar Date nativo
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';

//COMPONENTES
import { SegLoginComponent } from './Modulo-seguridad/Components/SEG-autenticacion/seg-login/seg-login.component';
import { SegMenuprincipalComponent } from './Modulo-seguridad/Components/SEG-autenticacion/seg-menuprincipal/seg-menuprincipal.component';
import { SegMenuitemComponent } from './Modulo-seguridad/Components/SEG-autenticacion/seg-menuitem/seg-menuitem.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MatTableExporterModule } from 'mat-table-exporter';
import { MatSelectFilterModule } from 'mat-select-filter';
import { SEGCargaEsperaComponent } from './Modulo-seguridad/Components/seg-carga-espera/seg-carga-espera.component';
import { ClSolicitudComponent } from './Modulo-cliente/Components/cl-solicitud/cl-solicitud.component';
import { AdmSolicitudComponent } from './Modulo-administrador/Components/adm-solicitud/adm-solicitud.component';
import { MatCardModule } from '@angular/material/card';
import { ClSolicitudNuevoComponent } from './Modulo-cliente/Components/cl-solicitud-nuevo/cl-solicitud-nuevo.component';
import { AdmSolicitudNuevoComponent } from './Modulo-administrador/Components/adm-solicitud-nuevo/adm-solicitud-nuevo.component';
import { ClSolicitudRegistraComponent } from './Modulo-cliente/Components/cl-solicitud-registra/cl-solicitud-registra.component';
import { SegRegistraUsuarioDialogComponent } from './Modulo-seguridad/Components/seg-registra-usuario-dialog/seg-registra-usuario-dialog.component';
import { AdmDashboardComponent } from './Modulo-administrador/Components/adm-dashboard/adm-dashboard.component';



@NgModule({
  declarations: [
    AppComponent,
    SegLoginComponent,
    SegMenuprincipalComponent,
    SegMenuitemComponent,
    SEGCargaEsperaComponent,
    ClSolicitudComponent,
    AdmSolicitudComponent,
    ClSolicitudNuevoComponent,
    AdmSolicitudNuevoComponent,
    ClSolicitudRegistraComponent,
    SegRegistraUsuarioDialogComponent,
    AdmDashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatExpansionModule,
    MatToolbarModule,
    MatListModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    HttpClientModule,
    MatSelectModule,
    MatDialogModule,
    CdkAccordionModule,
    MatTreeModule,
    MatCheckboxModule,
    MatTabsModule,
    MatTooltipModule,
    MatRadioModule,
    MatCardModule,
    MatTooltipModule,
    MatRadioModule,
    FormsModule,
    NgxChartsModule,
    MatTableExporterModule,
    MatAutocompleteModule,
    NgxChartsModule,
    MatTableExporterModule,
    MatSelectFilterModule,
    MatAutocompleteModule,
    MatSortModule,
    MatNativeDateModule,
    MatFormFieldModule,
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy},
    {provide: APP_INITIALIZER, useFactory: userContextInitializer,deps: [UserContextService],multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
