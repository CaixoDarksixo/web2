import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-autocadastro',
  templateUrl: './autocadastro.component.html',
  styleUrls: ['./autocadastro.component.css']
})
export class AutoCadastroComponent {
  cadastroForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.cadastroForm = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.cadastroForm.valid) {
      console.log("Cadastro enviado:", this.cadastroForm.value);
    }
  }

  get nome() { return this.cadastroForm.get('nome'); }
  get email() { return this.cadastroForm.get('email'); }
  get senha() { return this.cadastroForm.get('senha'); }
}
