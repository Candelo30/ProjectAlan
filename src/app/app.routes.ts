import { Routes } from '@angular/router';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { InicioComponent } from './inicio/inicio.component';

export const routes: Routes = [
  { path: 'project/:id', component: ProjectDetailComponent },
  { path: '**', component: InicioComponent },
  { path: '', component: InicioComponent },
];
