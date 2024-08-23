import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router'; 
import { AuthService } from '../service/services.service';
import { NavigationService } from '../navigation.service';
@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [MatButtonModule,MatIconModule],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.css'
})
export class TopBarComponent {
  constructor(private router: Router,  private authService: AuthService , private navigationService: NavigationService) { }

  logout() {
    console.log('Logout method called in AuthService');
    this.navigationService.setSponsorActive(false);
    this.authService.logout(); 
    this.router.navigate(['/restaurant-profile']);
  }

}
