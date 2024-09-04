import { Routes } from '@angular/router';
import { UsuarioListComponent } from './components/usuarios/list/list.component';
import { UsuarioFormComponent } from './components/usuarios/form/form.component';

export const routes: Routes = [
  {
    path: '',
    component: UsuarioListComponent
  },
  // {
  //   path: '',
  //   component: UsuarioFormComponent
  // }
];
