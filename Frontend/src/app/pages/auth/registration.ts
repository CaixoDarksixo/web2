import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { InputMaskModule } from 'primeng/inputmask';
import { MessageModule } from 'primeng/message';
import { AppFloatingConfigurator } from '../../layout/component/app.floatingconfigurator';
import { CepService } from '../service/cep.service';
import { debounceTime, distinctUntilChanged, filter} from 'rxjs/operators';


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
    template: ` 
    <app-floating-configurator />
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
                <div class="text-surface-900 dark:text-surface-0 text-3xl font-medium mb-4">Olá, cliente FixSys!</div>
                <span class="text-muted-color font-medium">Faça seu cadastro para acessar o sistema</span>
            </div>

            
            <form [formGroup]="form" class="w-full">
                <label for="email1" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2 after:ml-0.5 after:text-red-600 after:content-['*']" >E-mail</label>
                <input pInputText id="email1" type="email" placeholder="Insira o e-mail" class="w-full md:w-120 mb-2" formControlName="email" />
                @if (form.controls.email.touched && form.controls.email.invalid) {
                    <p-message severity="error" size="small" variant="simple">Informe um email válido.</p-message>
                }
                  
                <label for="cpf" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2 mt-4 after:ml-0.5 after:text-red-600 after:content-['*']" >CPF</label>
                <div class="w-full md:w-120 mb-2">
                  <p-inputmask mask="999.999.999-99" id="cpf" fluid="true" placeholder="Insira o CPF" formControlName="cpf" />
                </div>
                @if (form.controls.cpf.touched && form.controls.cpf.invalid) {
                      @if (form.controls.cpf.errors?.['required']) {
                          <p-message severity="error" size="small" variant="simple">O CPF é obrigatório.</p-message>
                      } @else if (form.controls.cpf.errors?.['invalidCpf']) {
                          <p-message severity="error" size="small" variant="simple">Informe um CPF válido.</p-message>
                      }
                  }
                
                <label for="nome" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2 mt-4 after:ml-0.5 after:text-red-600 after:content-['*']" >Nome</label>
                <input pInputText id="text" placeholder="Insira o nome" class="w-full md:w-120 mb-2" formControlName="nome" />
                @if (form.controls.nome.touched && form.controls.nome.invalid) {
                    <p-message severity="error" size="small" variant="simple">Informe seu nome.</p-message>
                }

                <label for="telefone" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2 mt-4 after:ml-0.5 after:text-red-600 after:content-['*']" >Telefone</label>
                <div class="w-full md:w-120 mb-2">
                <p-inputmask mask="(99) 99999-9999" id="telefone" fluid="true" placeholder="Insira o telefone" class="w-full md:w-120 mb-2" formControlName="telefone" />
                </div>
                @if (form.controls.telefone.touched && form.controls.telefone.invalid) {
                    <p-message severity="error" size="small" variant="simple">Informe um telefone válido.</p-message>
                }
                
                <label for="cep" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2 mt-4 after:ml-0.5 after:text-red-600 after:content-['*']" >CEP</label>
                <div class="w-full md:w-120 mb-2">
                  <p-inputmask mask="99.999-999" id="cep" fluid="true" placeholder="Insira o CEP" formControlName="cep" />
                </div>
                @if (form.controls.cep.touched && form.controls.cep.invalid) {
                      @if (form.controls.cep.errors?.['required']) {
                          <p-message severity="error" size="small" variant="simple">Informe o CEP.</p-message>
                      } @else if (form.controls.cep.errors?.['invalidCep']) {
                        <p-message severity="error" size="small" variant="simple">Informe um CEP válido.</p-message>
                      }
                  }

                <label for="logradouro" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2 mt-4" >Logradouro</label>
                <input pInputText id="logradouro" placeholder="Logradouro" class="w-full md:w-120 mb-2" formControlName="logradouro" readonly />
                <label for="numero" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2 mt-4 after:ml-0.5 after:text-red-600 after:content-['*']" >Número</label>
                <input pInputText inputId="integeronly" type="number" placeholder="Insira o número" class="w-full md:w-120 mb-2" formControlName="numero" [min]="0"/>
                @if (form.controls.numero.touched && form.controls.numero.invalid) {
                <p-message severity="error" size="small" variant="simple">Insira um número válido.</p-message>
                }

                <label for="bairro" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2 mt-4" >Bairro</label>
                <input pInputText id="bairro" placeholder="Bairro" class="w-full md:w-120 mb-2" formControlName="bairro" readonly />
                <label for="cidade" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2 mt-4" >Cidade</label>
                <input pInputText id="cidade" placeholder="Cidade" class="w-full md:w-120 mb-2" formControlName="cidade" readonly />
                <label for="estado" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2 mt-4" >Estado</label>
                <input pInputText id="estado" placeholder="Estado" class="w-full md:w-120 mb-12" formControlName="estado" readonly />

                <p-button type="submit" [label]="loading ? 'Cadastrando...' : 'Cadastrar'" class="block" styleClass="w-full" [disabled]="form.invalid || loading" [loading]="loading"></p-button>
                <div class="mt-4 text-center">
                  <span class="text-muted-color">Já tem uma conta?</span>
                  <a routerLink="/auth/login" class="font-medium ml-2 text-primary-500 hover:text-primary-700 transition-colors duration-200">Faça login</a>
                </div>

            </form>
          </div>
        </div>
      </div>
    </div>  
    `
})
export class Registration {
    private fb = inject(FormBuilder);
    private cepService = inject(CepService);

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
      this.form.markAllAsTouched();
      if (this.form.invalid) return;
    
      this.loading = true;
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