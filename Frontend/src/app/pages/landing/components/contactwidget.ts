import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'contact-widget',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
<section class="py-8">
    <div class="max-w-4xl mx-auto text-center mb-10">
    <h2 class="text-3xl font-bold">Fale Conosco</h2>
    <p class="mt-2">Envie uma mensagem e entraremos em contato com você.</p>
    </div>

<form (ngSubmit)="onSubmit()" #contactForm="ngForm" class="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg space-y-6">

<div>
    <label class="block text-left text-gray-700 font-medium">Nome</label>
    <input type="text" name="name" [(ngModel)]="formData.name"
    required class="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"/>
</div>

<div>
    <label class="block text-left text-gray-700 font-medium">Email</label>
    <input type="email" name="email" [(ngModel)]="formData.email"
    required class="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"/>
</div>

<div>
    <label class="block text-left text-gray-700 font-medium">Mensagem</label>
    <textarea name="message" [(ngModel)]="formData.message" rows="4"
    required class="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"></textarea>
</div>

<button type="submit"
    class="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
    Enviar Mensagem
</button>
</form>
</section>
  `,
})
export class ContactWidget {
formData = {
name: '',
email: '',
message: ''
  };

onSubmit() {
console.log('Mensagem enviada:', this.formData);
alert('Mensagem enviada com sucesso!');
this.formData = { name: '', email: '', message: '' }; // reseta
  }
}
