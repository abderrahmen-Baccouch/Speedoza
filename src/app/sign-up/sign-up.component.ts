import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  onSubmit(form: NgForm): void {
    if (form.valid && this.password === this.confirmPassword) {
      
      console.log('Sign-up successful', form.value);
    } else {
      console.error('Sign-up failed');
    }
  }
}
