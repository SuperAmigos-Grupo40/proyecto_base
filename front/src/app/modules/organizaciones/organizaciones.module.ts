import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganizacionesRoutingModule } from './organizaciones-routing.module';
import { OrganizacionesComponent } from './organizaciones.component';
import { CoreModule } from 'src/app/core/core.module';
import { DashboardOrganizacionComponent } from './dashboard-organizacion/dashboard-organizacion.component';
import { DatosOrganizacionComponent } from './datos-organizacion/datos-organizacion.component';
import { TareasOrganizacionComponent } from './tareas-organizacion/tareas-organizacion.component';
import { CrearModificarTareaModalComponent } from './modales-organizacion/crear-modificar-tarea-modal/crear-modificar-tarea-modal.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    OrganizacionesComponent,
    DashboardOrganizacionComponent,
    DatosOrganizacionComponent,
    TareasOrganizacionComponent,
    CrearModificarTareaModalComponent,
  ],
  imports: [
    CommonModule,
    OrganizacionesRoutingModule,
    CoreModule,
    SharedModule
  ]
})
export class OrganizacionesModule { }
