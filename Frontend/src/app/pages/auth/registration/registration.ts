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
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';


@Component({
    selector: 'app-registration',
    standalone: true,
    providers: [MessageService],
    imports: [
        AppFloatingConfigurator,
        ReactiveFormsModule,
        InputTextModule,
        InputMaskModule,
        InputNumberModule,
        MessageModule,
        ButtonModule,
        RouterModule,
        ToastModule
    ],
    templateUrl: './registration.html',
})
export class Registration {
  private fb = inject(FormBuilder);
  private cepService = inject(CepService);
  private registrationService = inject(RegistrationService);
  private messageService = inject(MessageService);

  cadastroRealizado: Boolean = false;
  loading: Boolean = false;

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
    this.form.markAllAsTouched();
    if (this.form.invalid) return;
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
        this.cadastroRealizado = true;
        this.form.reset();
      },
      error: (err) => {
        this.loading = false;
        this.messageService.add({
                    severity: 'error',
                    summary: 'Erro ao cadastrar',
                    detail: 'Não foi possível realizar o cadastro. Verifique os dados e tente novamente.',
                    life: 5000
                });
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