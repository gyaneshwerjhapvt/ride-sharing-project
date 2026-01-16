import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/users/user-service';

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

  isLoginMode = signal(true);
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);

  authForm = this.fb.group({
    full_name: [''],
    email_username: ['', [Validators.required]],
    phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    password: ['',[Validators.required, Validators.minLength(6)]],
    role: ['rider'],
    license_number: ['']
  });

  toggleMode() {
    this.isLoginMode.update(v => !v);
    this.errorMessage.set(null);
  }

  onSubmit() {
    if (this.authForm.invalid) return;
    this.isLoading.set(true);

    const formData = this.authForm.getRawValue();
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
      },
      error: (err) => {
        this.errorMessage.set(err.error?.message || 'Authentication error');
        this.isLoading.set(false);
      }
    });
  }
}