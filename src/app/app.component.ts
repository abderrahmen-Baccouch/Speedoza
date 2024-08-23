import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TopBarComponent } from './top-bar/top-bar.component';
import { RightContentComponent } from './right-content/right-content.component';
import { LeftContentComponent } from './left-content/left-content.component';
import { AuthService } from './service/services.service';
import { AdminSpaceComponent } from './admin-space/admin-space.component';
import { RestaurantProfileComponent } from './restaurant-profile/restaurant-profile.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, TopBarComponent, RightContentComponent, LeftContentComponent,AdminSpaceComponent, RestaurantProfileComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'WicoProject';
  isLoggedIn = false;
  isLoading = false; 
  isSponsorActive = false; 
  constructor(private authService: AuthService, private router: Router) {
    this.authService.isLoggedIn.subscribe((loggedIn: boolean) => {
      this.isLoggedIn = loggedIn;
      this.isLoading = this.isLoading;
    });
  }


}