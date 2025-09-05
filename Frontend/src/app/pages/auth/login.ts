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
import { AppFloatingConfigurator } from '../../layouts/component/app.floatingconfigurator';
import { AuthService } from '../service/auth.service';

interface LoginResponse {
  token?: string;
  message?: string;
  //Propriedades da API
}

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
  template: `
    <app-floating-configurator />
    <p-toast></p-toast>
    <div class="bg-surface-50 dark:bg-surface-950 flex items-center justify-center min-h-screen w-full overflow-hidden">
      <div class="flex flex-col items-center justify-center">
        <div style="border-radius:56px;padding:0.3rem;background:linear-gradient(180deg,var(--primary-color) 10%, rgba(33,150,243,0) 30%)">
          <div class="w-full bg-surface-0 dark:bg-surface-900 py-20 px-8 sm:px-20" style="border-radius:53px">
            <div class="text-center mb-8">
              <svg viewBox="0 0 78 78" fill="none" xmlns="http://www.w3.org/2000/svg" class="mb-8 w-16 shrink-0 mx-auto">
                <path d="M26.8414 30.472L52.0329 56.52L55.1818 53.3627L29.2031 28.104L34.7138 23.368L26.8414 21L18.1818 29.6827L22.9052 34.4187L26.8414 30.472Z" fill="var(--primary-color)"/>
                <path d="M44.6747 33.5972L22.9294 54.0659L26.8164 57.998L47.0069 35.9565L54.778 38.3129L60.2133 31.2287L56.3263 27.2966L52.4442 32.8064L49.3358 32.0212L48.5568 28.0874L53.9941 24.9373L50.1071 21.0052L42.3396 25.7302L44.6747 33.5972Z" fill="var(--primary-color)"/>
                <mask id="mask0_4_30" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="78" height="78">
                  <path d="M38.8623 19.127C36.2706 19.127 33.704 19.6372 31.3096 20.6289C28.9151 21.6207 26.7389 23.0746 24.9062 24.9072C23.0736 26.7399 21.6197 28.916 20.6279 31.3105C19.6361 33.705 19.126 36.2715 19.126 38.8633C19.1263 44.0974 21.206 49.1174 24.9072 52.8184C28.6084 56.5193 33.6282 58.5986 38.8623 58.5986C44.0961 58.5983 49.1155 56.5191 52.8164 52.8184C56.5174 49.1174 58.5973 44.0972 58.5977 38.8633C58.5977 33.6292 56.5182 28.6094 52.8174 24.9082C49.1164 21.2069 44.0965 19.1273 38.8623 19.127ZM33.4287 68.2295L31.8975 67.8604C28.8587 67.1285 25.9532 65.9239 23.2881 64.291L21.9443 63.4678L16.6396 68.7725L8.9541 61.0869L13.1338 56.9072L14.248 55.7939L13.4268 54.4502C11.7958 51.7818 10.5935 48.8736 9.86523 45.832L9.49805 44.2979H2V33.4287H9.49707L9.86621 31.8975C10.5981 28.8587 11.8017 25.9532 13.4346 23.2881L14.2588 21.9443L8.9541 16.6396L16.6396 8.9541L20.8193 13.1338L21.9326 14.248L23.2764 13.4268C25.9447 11.7959 28.8529 10.5938 31.8936 9.86523L33.4277 9.49805V2.00488H44.2998V9.50098L45.832 9.87012C48.8711 10.6019 51.7761 11.8066 54.4414 13.4395L55.7861 14.2627L56.9004 13.1484L61.0898 8.95801L68.7764 16.6426L64.5938 20.8184L63.4775 21.9316L64.2998 23.2773C65.9306 25.9453 67.1321 28.8533 67.8604 31.8945L68.2285 33.4287H75.7266V44.2969H68.2295L67.8604 45.8291C67.1285 48.8682 65.9239 51.7732 64.291 54.4385L63.4678 55.7832L64.583 56.8975L68.7715 61.0859L61.0859 68.7715L55.793 63.4785L54.4492 64.2998C51.7813 65.9306 48.8733 67.132 45.832 67.8604L44.2979 68.2285V75.7266H33.4287V68.2295Z" stroke="black" stroke-width="4"/>
                </mask>
                <g mask="url(#mask0_4_30)">
                  <circle cx="38.5" cy="38.5" r="31.5" stroke="var(--primary-color)" stroke-width="18"/>
                </g>
              </svg>
              <div class="text-surface-900 dark:text-surface-0 text-3xl font-medium mb-4">Bem-vindo ao FixSys!</div>
              <span class="text-muted-color font-medium">Faça login para continuar</span>
            </div>

            <form [formGroup]="form" (ngSubmit)="onSubmit()" class="w-full">
              <label for="email1" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2" >E-mail</label>
              <input pInputText id="email1" type="email" placeholder="Insira o e-mail" class="w-full md:w-120 mb-2" formControlName="email" />
              @if (form.controls.email.touched && form.controls.email.invalid) {
                <p-message severity="error" size="small" variant="simple">Informe um email válido.</p-message>
              }
              
              <label for="password1" class="block text-surface-900 dark:text-surface-0 font-medium text-xl mb-2 mt-4">Senha</label>
              <p-password id="password1" formControlName="password" placeholder="Insira a senha" [toggleMask]="true" styleClass="mb-2" [fluid]="true" [feedback]="false"></p-password>
              @if (form.controls.password.touched && form.controls.password.invalid) {
                <p-message severity="error" size="small" variant="simple">Senha é obrigatória.</p-message>
              }

              <div class="flex mt-4 mb-8">
                <p-checkbox formControlName="remember" inputId="rememberme1" binary class="mr-2"></p-checkbox>
                <label for="rememberme1">Lembre-se de mim</label>
              </div>

              <p-button type="submit" [label]="loading ? 'Entrando...' : 'Entrar'" styleClass="w-full" [disabled]="form.invalid || loading" [loading]="loading"></p-button>
              <div class="mt-4 text-center">
                <span class="text-muted-color">Não tem uma conta?</span>
                <a routerLink="/auth/registration" class="font-medium ml-2 text-primary-500 hover:text-primary-700 transition-colors duration-200">Cadastre-se</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  `
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
        
        this.router.navigate(['/dashboard']);
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