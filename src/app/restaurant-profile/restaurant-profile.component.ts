// restaurant-profile.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/services.service'; 
import { NavigationService } from '../navigation.service';
@Component({
  selector: 'app-restaurant-profile',
  templateUrl: './restaurant-profile.component.html',
  styleUrls: ['./restaurant-profile.component.css'],
  standalone: true,
})
export class RestaurantProfileComponent {

constructor(private router: Router, private authService: AuthService ,  private navigationService: NavigationService) {}
goToLogin() { 
  this.router.navigate(['/login']);
}

}