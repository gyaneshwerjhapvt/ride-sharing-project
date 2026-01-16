import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/users/user-service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user-auth',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './users.html',
  styleUrls: ['./users.css']
})
export class UserAuthComponent {
  private fb = inject(FormBuilder);
  private userService = inject(UserService);
  private authService = inject(AuthService);
  private router = inject(Router);

  isLoginMode = signal(true);
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);
  successMessage = signal<string | null>(null);

  authForm = this.fb.group({
    full_name: [''],
    email_username: ['', [Validators.required]],
    phone: ['', [Validators.pattern('^[0-9]{10}$')]],
    password: ['',[Validators.required, Validators.minLength(6)]],
    role: ['rider'],
    license_number: ['']
  });

  toggleMode() {
    this.isLoginMode.update(v => !v);
    this.errorMessage.set(null);
    this.successMessage.set(null);
    this.authForm.reset({
      role: 'rider',
      full_name: '',
      email_username: '',
      phone: '',
      password: '',
      license_number: ''
    });
  }

  onSubmit() {
    if (this.authForm.invalid) {
      this.authForm.markAllAsTouched();
      this.errorMessage.set('Please fill in all required fields correctly.');
      return;
    }
    
    this.isLoading.set(true);
    this.errorMessage.set(null);
    this.successMessage.set(null);

    const formData = this.authForm.getRawValue();
    
    // Validation for registration
    if (!this.isLoginMode()) {
      if (!formData.full_name || formData.full_name.trim() === '') {
        this.errorMessage.set('Full name is required.');
        this.isLoading.set(false);
        return;
      }
      if (formData.role === 'driver' && (!formData.license_number || formData.license_number.trim() === '')) {
        this.errorMessage.set('Driver license number is required for drivers.');
        this.isLoading.set(false);
        return;
      }
    }
    
    // Reconstruct email for the backend
    const submissionData = {
      ...formData,
      email: `${formData.email_username}@gmail.com`
    };

    const request = this.isLoginMode() 
      ? this.userService.login(submissionData)
      : this.userService.register(submissionData);

    request.subscribe({
      next: (res) => {
        console.log('Success', res);
        this.isLoading.set(false);
        
        if (res.user) {
          // Store user in auth service
          this.authService.setUser(res.user);
          
          if (this.isLoginMode()) {
            this.successMessage.set(`Welcome back, ${res.user.full_name || 'User'}! Login successful.`);
            // Redirect to rides after 1.5 seconds
            setTimeout(() => {
              this.router.navigate(['/rides']);
            }, 1500);
          } else {
            this.successMessage.set(`Account created successfully! Welcome to SwiftRide, ${res.user.full_name || 'User'}!`);
            // Clear form after successful registration
            setTimeout(() => {
              this.authForm.reset({
                role: 'rider',
                full_name: '',
                email_username: '',
                phone: '',
                password: '',
                license_number: ''
              });
              // Auto-switch to login mode after 3 seconds
              setTimeout(() => {
                this.toggleMode();
              }, 3000);
            }, 2000);
          }
        }
      },
      error: (err) => {
        console.error('Authentication error:', err);
        const errorMsg = err.error?.message || err.message || 'Authentication failed. Please try again.';
        this.errorMessage.set(errorMsg);
        this.isLoading.set(false);
      }
    });
  }
}