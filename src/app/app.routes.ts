import { Routes } from '@angular/router';
import { AdminSpaceComponent } from './admin-space/admin-space.component';
import { LeftContentComponent } from './left-content/left-content.component';
import { RestaurantProfileComponent } from './restaurant-profile/restaurant-profile.component';
import { SponsoringRestaurantComponent } from './sponsoring-restaurant/sponsoring-restaurant.component';


export const routes: Routes = [
  { path: '', redirectTo: 'restaurant-profile', pathMatch: 'full' }, 
  { path: 'restaurant-profile', component: RestaurantProfileComponent }, 
  { path: 'login', component: LeftContentComponent },
  { path: 'admin-space', component: AdminSpaceComponent },
  { path: '**', redirectTo: 'restaurant-profile' } 
  
];

