import { Routes } from '@angular/router';
import { AdminSpaceComponent } from './admin-space/admin-space.component';
import { LeftContentComponent } from './left-content/left-content.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LeftContentComponent },
  { path: 'admin-space', component: AdminSpaceComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
