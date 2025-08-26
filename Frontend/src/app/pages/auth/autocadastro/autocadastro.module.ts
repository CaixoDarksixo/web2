import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { AutoCadastroComponent } from './autocadastro.component';

@NgModule({
  declarations: [AutoCadastroComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    RouterModule.forChild([{ path: '', component: AutoCadastroComponent }])
  ]
})
export class AutoCadastroModule { }