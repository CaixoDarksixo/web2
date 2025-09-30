import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MessageModule } from 'primeng/message';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'contact-widget',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    MessageModule,
    InputTextModule,
    TextareaModule,
    ButtonModule
  ],
  template: `
<section class="py-8">
    <div class="max-w-4xl mx-auto text-center mb-10">
    <div class="text-5xl font-normal mb-6">Fale Conosco</div>
    <p class="text-muted-color text-2xl">Envie uma mensagem e entraremos em contato com você.</p>
    </div>
      <div class="flex flex-col items-center justify-center">
        <div class="shadow-xl" style="border-radius:56px;padding:0.3rem;background:linear-gradient(180deg,var(--primary-color) 10%, rgba(233, 195, 250, 1) 100%);">
          <div class="w-full bg-surface-800 py-20 px-8 sm:px-20" style="border-radius:53px; background: linear-gradient(0deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)), radial-gradient(77.36% 256.97% at 77.36% 57.52%, rgba(194, 175, 239, 1) 0%, rgba(233, 195, 250, 1) 100%);">
            <form [formGroup]="form" (ngSubmit)="onSubmit()" class="w-full">
              <div>
                <label for="nome" class="block text-surface-900 text-xl font-medium mb-2 mt-4 after:ml-0.5 after:text-red-600 after:content-['*']" >Nome</label>
                <input pInputText id="text" placeholder="Insira o nome" pSize="large" class="w-full text-gray-700 md:w-160 mb-2" style="color:#000000; background:rgba(255, 255, 255, 0.5)" formControlName="nome" />
                @if (form.controls.nome.touched && form.controls.nome.invalid) {
                    <p-message severity="error" size="small" variant="simple">Informe seu nome.</p-message>
                }
              </div>
              <div>
                <label for="email1" class="block text-surface-900 text-xl font-medium mb-2 after:ml-0.5 after:text-red-600 after:content-['*']" >E-mail</label>
                <input pInputText id="email1" type="email" placeholder="Insira o e-mail" pSize="large" class="w-full text-gray-700 md:w-160 mb-2" style="color:#000000; background:rgba(255, 255, 255, 0.5)" formControlName="email" />
                @if (form.controls.email.touched && form.controls.email.invalid) {
                    <p-message severity="error" size="small" variant="simple">Informe um email válido.</p-message>
                }
              </div>

              <div>
                <label for="mensagem" class="block text-surface-900 text-xl font-medium mb-2 mt-4 after:ml-0.5 after:text-red-600 after:content-['*']" >Mensagem</label>
                <textarea rows="4" pSize="large" pTextarea class="w-full md:w-160 mb-2" fluid=true [autoResize]="true" style="color:#000000; background:rgba(255, 255, 255, 0.5)" formControlName="mensagem"></textarea>
                @if (form.controls.mensagem.touched && form.controls.mensagem.invalid) {
                    <p-message severity="error" size="small" variant="simple">Insira uma mensagem</p-message>
                }
              </div>

              <p-button type="submit" class="block mt-8" size="large" styleClass="w-full" [disabled]="form.invalid" label="Enviar Mensagem" icon="pi pi-send"></p-button>
            </form>
          </div>
        </div>
      </div>
</section>
  `,
})
export class ContactWidget {
  formData = {
  name: '',
  email: '',
  message: ''
    };
  
  private fb = new FormBuilder();

  form = this.fb.group({
    nome: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    mensagem: ['', Validators.required]
  });

  onSubmit() {
    console.log('Mensagem enviada:', this.formData);
    alert('Mensagem enviada com sucesso!');
    this.formData = { name: '', email: '', message: '' }; // reseta
  }
}
