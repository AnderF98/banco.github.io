import { Routes } from '@angular/router';
import { ClientesComponent } from './clientes/clientes.component';
import { ClienteFormComponent } from './cliente-form/cliente-form';
import { ProductosComponent } from './productos/productos';
import { ProductoFormComponent } from './producto-form/producto-form';
import { UsuariosComponent } from './usuarios/usuarios';
import { UsuarioFormComponent } from './usuario-form/usuario-form';
import { SolicitudesComponent } from './solicitudes/solicitudes';
import { SolicitudFormComponent } from './solicitud-form/solicitud-form';

export const routes: Routes = [
  { path: 'clientes', component: ClientesComponent },
  { path: 'clientes/nuevo', component: ClienteFormComponent },
  { path: 'clientes/editar/:id', component: ClienteFormComponent },
  { path: 'productos', component: ProductosComponent },
  { path: 'productos/nuevo', component: ProductoFormComponent },
  { path: 'productos/editar/:id', component: ProductoFormComponent },
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'usuarios/nuevo', component: UsuarioFormComponent },
  { path: 'usuarios/editar/:id', component: UsuarioFormComponent },
  { path: 'solicitudes', component: SolicitudesComponent },
  { path: 'solicitudes/nuevo', component: SolicitudFormComponent },
  { path: 'solicitudes/editar/:id', component: SolicitudFormComponent },
  { path: '', redirectTo: '/clientes', pathMatch: 'full' }
];