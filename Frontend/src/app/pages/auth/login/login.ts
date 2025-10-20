import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { AppFloatingConfigurator } from '@/layouts/component/app.floatingconfigurator';
import { AuthService } from '@/services/auth.service';
import { LoginResponse } from '@/models/auth';

interface LoginError {
  error?: {
    message?: string;
  };
}

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        RouterModule,
        ButtonModule,
        CheckboxModule,
        InputTextModule,
        PasswordModule,
        RippleModule,
        ToastModule,
        AppFloatingConfigurator,
        MessageModule
    ],
    providers: [MessageService],
    templateUrl: './login.html'
})

export class Login {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);
  private msg = inject(MessageService);

  loading = false;
  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    remember: [true]
  });

  onSubmit() {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;
    
    this.loading = true;
    const { email, password, remember } = this.form.getRawValue();

    this.auth.login({ 
      email: String(email), 
      password: String(password) 
    }).subscribe({
      next: (res: LoginResponse) => {
        this.msg.add({ 
          severity: 'success', 
          summary: 'Login', 
          detail: 'Login realizado com sucesso!' 
        });
        
        if (res?.token) {
          this.auth.storeToken(res.token, !!remember);
        }
        console.log(res?.usuario?.roles[0]);
        switch (res?.usuario?.roles[0]) {
          case 'FUNCIONARIO':
            this.router.navigate(['/funcionario']);
            return;
          case 'CLIENTE':
            this.router.navigate(['/cliente']);
            return;
        }
      },
      error: (err: LoginError) => {
        const detail = err?.error?.message ?? 'Falha no login. Verifique se você digitou certo.';
        this.msg.add({ 
          severity: 'error', 
          summary: 'Erro', 
          detail 
        });
      }
    }).add(() => {
      this.loading = false;
    });
  }
}