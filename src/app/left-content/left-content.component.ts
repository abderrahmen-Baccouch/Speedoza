import { Component, Renderer2 } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../service/services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-left-content',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './left-content.component.html',
  styleUrls: ['./left-content.component.css']
})
export class LeftContentComponent {
  email: string = '';
  password: string = '';

  signUpEmail: string = '';
  signUpPassword: string = '';
  signUpConfirmPassword: string = '';

  isSignUpVisible: boolean = false;
  isPasswordVisible: boolean = false;
  isConfirmPasswordVisible: boolean = false;

  constructor(private authService: AuthService, private renderer: Renderer2 , private router: Router) {}

 
  onSubmit(form: NgForm): void {
    if (form.valid) {
      this.authService.login(this.email, this.password).subscribe(
        response => {
          console.log('Login successful', response);
          this.router.navigate(['/admin-space']);
        },
        error => {
          console.error('Login failed', error);
        }
      );
    }
  }


  onSignUp(form: NgForm): void {
    if (form.valid) {
    
      console.log('Sign-up successful', form.value);
      this.hideSignUp();
    }
  }
  togglePasswordVisibility(id: string) {
    const passwordInput = document.getElementById(id) as HTMLInputElement;
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      if (id === 'signup-password') {
        this.isPasswordVisible = true;
      } else if (id === 'confirm-password') {
        this.isConfirmPasswordVisible = true;
      }
    } else {
      passwordInput.type = "password";
      if (id === 'signup-password') {
        this.isPasswordVisible = false;
      } else if (id === 'confirm-password') {
        this.isConfirmPasswordVisible = false;
      }
    }
  }

  showSignUp(): void {
    this.isSignUpVisible = true;
    this.renderer.addClass(document.querySelector('body'), 'blurred');
  }

  hideSignUp(): void {
    const modalElement = document.querySelector('.modal');
    const backdropElement = document.querySelector('.backdrop');

    if (modalElement && backdropElement) {
      this.renderer.addClass(modalElement, 'modal-hide');
      this.renderer.addClass(backdropElement, 'backdrop-hide');

      setTimeout(() => {
        this.isSignUpVisible = false;
        this.renderer.removeClass(document.querySelector('body'), 'blurred');
      }, 300); 
    }
  }
  showLogin(): void {
    this.isSignUpVisible = false;
    
  }
}
