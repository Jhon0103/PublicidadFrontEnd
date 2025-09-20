import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';
import { SegLoginComponent } from './Modulo-seguridad/Components/SEG-autenticacion/seg-login/seg-login.component';
import { SegMenuprincipalComponent } from './Modulo-seguridad/Components/SEG-autenticacion/seg-menuprincipal/seg-menuprincipal.component';
import { AdmSolicitudComponent } from './Modulo-administrador/Components/adm-solicitud/adm-solicitud.component';
import { ClSolicitudComponent } from './Modulo-cliente/Components/cl-solicitud/cl-solicitud.component';
import { ClSolicitudNuevoComponent } from './Modulo-cliente/Components/cl-solicitud-nuevo/cl-solicitud-nuevo.component';
import { AdmSolicitudNuevoComponent } from './Modulo-administrador/Components/adm-solicitud-nuevo/adm-solicitud-nuevo.component';
import { ClSolicitudRegistraComponent } from './Modulo-cliente/Components/cl-solicitud-registra/cl-solicitud-registra.component';
import { AdmDashboardComponent } from './Modulo-administrador/Components/adm-dashboard/adm-dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: 'registra-Solicitud', pathMatch: 'full' },
  { path: 'login', component: SegLoginComponent },
  { path: 'registra-Solicitud', component: ClSolicitudRegistraComponent },
  {
    path: 'main',
    component: SegMenuprincipalComponent,
    children: [
      {
        path: 'adm-solicitud',
        component: AdmSolicitudComponent,
        canActivate: [AuthGuard],
        data: { expectedRoles: ['admin', 'trabajador'] } // plural y array
      },
      {
        path: 'adm-solicitud-nuevo',
        component: AdmSolicitudNuevoComponent,
        canActivate: [AuthGuard],
        data: { expectedRoles: ['admin', 'trabajador'] } // plural y array
      },
      {
        path: 'cl-solicitud',
        component: ClSolicitudComponent,
        canActivate: [AuthGuard],
        data: { expectedRoles: ['cliente'] } // corregido a plural
      },
      {
        path: 'cl-solicitud-nuevo',
        component: ClSolicitudNuevoComponent,
        canActivate: [AuthGuard],
        data: { expectedRoles: ['cliente'] } // plural y array
      },
      {
        path: 'adm-dashboard',
        component: AdmDashboardComponent,
        canActivate: [AuthGuard],
        data: { expectedRoles: ['admin', 'trabajador'] } // plural y array
      }
    ]
  },
  { path: '**', redirectTo: 'registra-Solicitud' } // catch-all por si navega a ruta inexistente
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
