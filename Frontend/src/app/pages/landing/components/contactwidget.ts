import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup, AbstractControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MessageModule } from 'primeng/message';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast'; 
import { MessageService } from 'primeng/api'; 



//validação
export function nomeValidator(control: AbstractControl): {[key: string]: any} | null {
const nameRe = /^[a-zA-Z\s]+$/;
return control.value && !nameRe.test(control.value) ? { 'nomeInvalido': { value: control.value } } : null;
}


@Component({
selector: 'contact-widget',
standalone: true,
imports: [
CommonModule, 
ReactiveFormsModule,
MessageModule,
InputTextModule,
TextareaModule,
ButtonModule,
ToastModule 
  ],
  providers: [MessageService], 
  template: `
<p-toast position="top-center"></p-toast> <section class="py-8">
  <div class="max-w-4xl mx-auto text-center mb-10">
  <div class="text-5xl font-normal mb-6">Fale Conosco</div>
  <p class="text-muted-color text-2xl">Envie uma mensagem e entraremos em contato com você.</p>
  </div>
    <div class="flex flex-col items-center justify-center">
      <div class="shadow-xl" style="border-radius:56px;padding:0.3rem;background:linear-gradient(180deg,var(--primary-color) 10%, rgba(233, 195, 250, 1) 100%);">
        <div class="w-full py-16 px-8 sm:px-16" style="border-radius:53px; background: linear-gradient(0deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)), radial-gradient(77.36% 256.97% at 77.36% 57.52%, rgba(194, 175, 239, 1) 0%, rgba(233, 195, 250, 1) 100%);">
          <form [formGroup]="form" (ngSubmit)="onSubmit()" class="w-full">
            
            <div class="mb-4">
              <label for="nome" class="block text-surface-900 text-xl font-medium mb-2 after:ml-0.5 after:text-red-600 after:content-['*']" >Nome</label>
              <input pInputText id="nome" type="text" placeholder="Insira seu nome completo" pSize="large" class="w-full text-gray-700 md:w-160 mb-2" style="color:#000000; background:rgba(255, 255, 255, 0.5)" formControlName="nome" />
              @if (form.controls['nome'].touched && form.controls['nome'].errors) {
                  <p-message severity="error" size="small" variant="text">
                      @if (form.controls['nome'].errors['required']) { <span>Informe seu nome.</span> }
                      @if (form.controls['nome'].errors['nomeInvalido']) { <span>Apenas letras e espaços são permitidos.</span> }
                  </p-message>
              }
            </div>
              
            <div class="mb-4">
              <label for="email1" class="block text-surface-900 text-xl font-medium mb-2 after:ml-0.5 after:text-red-600 after:content-['*']" >E-mail</label>
              <input pInputText id="email1" type="email" placeholder="nome@exemplo.com" pSize="large" class="w-full text-gray-700 md:w-160 mb-2" style="color:#000000; background:rgba(255, 255, 255, 0.5)" formControlName="email" />
              @if (form.controls['email'].touched && form.controls['email'].errors) {
                  <p-message severity="error" size="small" variant="text" [text]="'Informe um email válido.'"></p-message>
              }
            </div>

            <div class="mb-4">
              <label for="mensagem" class="block text-surface-900 text-xl font-medium mb-2 mt-4 after:ml-0.5 after:text-red-600 after:content-['*']" >Mensagem</label>
              <textarea rows="4" pSize="large" pTextarea class="w-full md:w-160 mb-2" [autoResize]="true" style="color:#000000; background:rgba(255, 255, 255, 0.5)" formControlName="mensagem" [attr.maxlength]="MAX_MESSAGE_LENGTH"></textarea>
              
              @if (form.controls['mensagem'].touched && form.controls['mensagem'].errors) {
                  <p-message severity="error" size="small" variant="text">
                      @if (form.controls['mensagem'].errors['required']) { <span>Insira uma mensagem.</span> }
                      @if (form.controls['mensagem'].errors['minlength']) { <span>A mensagem deve ter no mínimo 10 caracteres.</span> }
                      @if (form.controls['mensagem'].errors['maxlength']) { <span>A mensagem excedeu o limite de {{ MAX_MESSAGE_LENGTH }} caracteres.</span> }
                  </p-message>
              }
              <small class="block text-right text-surface-600">
                  {{ form.controls['mensagem'].value?.length || 0 }} / {{ MAX_MESSAGE_LENGTH }}
              </small>
            </div>

              <p-button type="submit" class="block mt-8" size="large" styleClass="w-full" 
                        [disabled]="form.invalid || isLoading" 
                        [label]="isLoading ? 'Enviando...' : 'Enviar Mensagem'" 
                        [icon]="isLoading ? 'pi pi-spin pi-spinner' : 'pi pi-send'">
              </p-button>
              
            </form>
          </div>
        </div>
      </div>
</section>
`
})
export class ContactWidget implements OnInit { 
private fb = inject(FormBuilder);
private http = inject(HttpClient); 
private messageService = inject(MessageService); 
  
isLoading = false;
form!: FormGroup; 

readonly MAX_MESSAGE_LENGTH = 200;

ngOnInit() {
  this.form = this.fb.group({
    nome: ['', [Validators.required, nomeValidator]],
    email: ['', [Validators.required, Validators.email]],
    mensagem: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(this.MAX_MESSAGE_LENGTH)]] 
  });
  }

onSubmit() {
  if (this.form.invalid) {
  this.messageService.add({ severity: 'warn', summary: 'Atenção', detail: 'Por favor, preencha todos os campos obrigatórios.' });
  return;
}

this.isLoading = true;
const urlDeDestino = ''; //URL ENDPOINT

  //POST
  this.http.post(urlDeDestino, this.form.value).subscribe({
    next: (response) => {
      this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Mensagem enviada com sucesso!' });
      console.log('Resposta do servidor:', response);
      this.form.reset(); 
      this.isLoading = false;
    },
    error: (error) => {
      this.messageService.add({ severity: 'error', summary: 'Erro de Envio', detail: 'Não foi possível enviar a mensagem. Tente novamente.' });
      console.error('Erro de envio:', error);
      this.isLoading = false;
    }
  });
  }
}