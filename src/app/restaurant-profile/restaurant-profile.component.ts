// restaurant-profile.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/services.service'; 
@Component({
  selector: 'app-restaurant-profile',
  templateUrl: './restaurant-profile.component.html',
  styleUrls: ['./restaurant-profile.component.css'],
  standalone: true,
})
export class RestaurantProfileComponent {

constructor(private router: Router, private authService: AuthService ) {}
goToLogin() { 
  this.router.navigate(['/login']);
}

}