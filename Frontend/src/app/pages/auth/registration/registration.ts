import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { InputMaskModule } from 'primeng/inputmask';
import { MessageModule } from 'primeng/message';
import { AppFloatingConfigurator } from '@/shared/components/app.floatingconfigurator';
import { CepService } from './services/cep.service';
import { ClienteRegisterDTO } from './services/registration.service';
import { RegistrationService } from './services/registration.service';
import { debounceTime, distinctUntilChanged, filter} from 'rxjs/operators';
import { Observable, of } from 'rxjs';


@Component({
    selector: 'app-registration',
    standalone: true,
    imports: [
        AppFloatingConfigurator,
        ReactiveFormsModule,
        InputTextModule,
        InputMaskModule,
        InputNumberModule,
        MessageModule,
        ButtonModule,
        RouterModule
    ],
    templateUrl: './registration.html',
})
export class Registration {
  private fb = inject(FormBuilder);
  private cepService = inject(CepService);
  private registrationService = inject(RegistrationService);

  loading = false;

  form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      cpf: ['', [Validators.required, this.cpfValidator]],
      nome: ['', Validators.required],
      cep: ['', [Validators.required, this.cepValidator]],
      logradouro: [{ value: '', disabled: true }],
      numero: ['', [Validators.required, Validators.min(1)]],
      bairro: [{ value: '', disabled: true }],
      cidade: [{ value: '', disabled: true }],
      estado: [{ value: '', disabled: true }],
      telefone: ['', [Validators.required]]
  });

  ngOnInit() {

    this.form.get('cep')?.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      filter(() => this.form.get('cep')?.valid ?? false)
    ).subscribe(cep => {
      const cleanedCep = cep ? cep.replace(/[^\d]/g, '') : '';
      this.cepService.getAddressByCep(cleanedCep).subscribe(address => {
      if (address) {
        this.form.patchValue({
        logradouro: address.logradouro,
        bairro: address.bairro,
        cidade: address.localidade,
        estado: address.uf
        });
      } else {
        this.form.get('cep')?.markAsTouched();
        this.form.get('cep')?.setErrors({ invalidCep: true });
        this.form.patchValue({
          logradouro: '',
          bairro: '',
          cidade: '',
          estado: ''
        });
      }
    });
    });
  }

  onSubmit() {
    console.log('Submitting registration form');
    this.form.markAllAsTouched();
    if (this.form.invalid) return;

    console.log('Submitting registration form', this.form.getRawValue());
    this.loading = true;

    const formData = this.form.getRawValue();

    const payload: ClienteRegisterDTO = {
      nome: formData.nome!,
      email: formData.email!,
      cpf: formData.cpf!,
      telefone: formData.telefone!,
      endereco: `${formData.logradouro}, ${formData.numero}, ` +
      `${formData.bairro}, ${formData.cidade} - ${formData.estado}, CEP: ${formData.cep}`
  }

    this.registrationService.ClienteRegister(payload).subscribe({
      next: () => {
        this.loading = false;
        alert('Cadastro realizado com sucesso! Verifique seu email para mais informações.');
        this.form.reset();
      },
      error: (err) => {
        this.loading = false;
        const detail = err?.error?.message ?? 'Falha no cadastro. Verifique os dados informados.';
        alert(`Erro: ${detail}`);
      }
    });
  }

  private cpfValidator(control: AbstractControl): ValidationErrors | null {
    const cpf = control.value?.replace(/[^\d]/g, '');


    if (!cpf || cpf.length !== 11) {
        return { invalidCpf: true };
    }

    if (/^(\d)\1{10}$/.test(cpf)) {
        return { invalidCpf: true };
    }

    let sum = 0;
    for (let i = 0; i < 9; i++) {
        sum += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let firstDigit = (sum * 10) % 11;
    if (firstDigit === 10 || firstDigit === 11) {
        firstDigit = 0;
    }
    if (firstDigit !== parseInt(cpf.charAt(9))) {
        return { invalidCpf: true };
    }

    sum = 0;
    for (let i = 0; i < 10; i++) {
        sum += parseInt(cpf.charAt(i)) * (11 - i);
    }
    let secondDigit = (sum * 10) % 11;
    if (secondDigit === 10 || secondDigit === 11) {
        secondDigit = 0;
    }
    if (secondDigit !== parseInt(cpf.charAt(10))) {
        return { invalidCpf: true };
    }

    return null;
  }

  private cepValidator(control: AbstractControl): ValidationErrors | null {
    const cep = control.value?.replace(/[^\d]/g, '');

    if (!cep || cep.length !== 8) {
        return { invalidCep: true };
      }
    
    return null; 
  }
}