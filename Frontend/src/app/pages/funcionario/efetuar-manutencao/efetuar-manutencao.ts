import { Component, inject, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RouterModule, Router, ActivatedRoute} from '@angular/router';
import { CommonModule, DatePipe, Location } from '@angular/common';
import { RequestService } from '@/core/services/request.service';
import { DialogModule } from 'primeng/dialog';
import { TextareaModule } from 'primeng/textarea';
import { FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import { MessageModule } from 'primeng/message';
import { SelectModule } from 'primeng/select';
import { AuthService } from '@/core/services/auth.service';
import { UserService } from '@/core/services/user.service';
import { Request } from '@/core/models/request.model';
import { Cliente } from '@/core/models/cliente.model';
import { Funcionario } from '@/core/models/funcionario.model';
import { FuncionarioService } from '../services/funcionario.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
    selector: 'efetuar-manutencao',
    standalone: true,
    imports: [
    ButtonModule, 
    RouterModule,
    DatePipe,
    CommonModule,
    MessageModule,
    ReactiveFormsModule,
    DialogModule,
    TextareaModule,
    SelectModule,
    ProgressSpinnerModule
    ],
    providers: [ProgressSpinnerModule],
    templateUrl: './efetuar-manutencao.html',
    
})
export class EfetuarManutencao implements OnInit {
    requestId?: number;
    request!: Request;
    cliente!: Cliente;
    funcionarios!: Funcionario[];
    currentUser: any;

    redirecionarDialogVisible: boolean = false;
    efetuarManutencaoDialogVisible: boolean = false;

    requestService = inject(RequestService);
    route = inject(ActivatedRoute);
    router = inject(Router);
    location = inject(Location);

    private fb = inject(FormBuilder);
    private userService = inject(UserService);
    private authService = inject(AuthService);
    private funcionarioService = inject(FuncionarioService);

    redirecionarForm = this.fb.group({
        funcionarioDestino: [null, [Validators.required]],
    });

    manutencaoForm = this.fb.group({
         descricaoManutencao: ['', [Validators.required]],
        instrucoesCliente: ['', [Validators.required]],
    });

    ngOnInit(): void {
        this.authService.getAuthenticatedUser().subscribe(user => {
            this.currentUser = user;

            this.funcionarioService.getFuncionarios().subscribe((data: Funcionario[]) => {
                console.log('funcionarios:', data);
                data = data.filter(f => f.id !== this.currentUser.id);
                this.funcionarios = data;
            });
        });

        this.requestId = parseInt(this.route.snapshot.paramMap.get('id') || '-1');
        if (isNaN(this.requestId) || this.requestId < 1) {
            this.router.navigate(['/notfound']);
            return;
        }

        this.requestService.getRequestById(this.requestId).subscribe((data: Request) => {
            this.request = data;
            if (!this.request) {
                this.router.navigate(['/notfound']);
                return;
            }
                
            this.userService.getClienteById(this.request.cliente!.id).subscribe((data: Cliente) => {
                this.cliente = data;
            });
        });
    }

    voltar() {
        if (history.state.fromList) {
            this.location.back();
        } else {
            this.router.navigate(['/funcionario/solicitacoes']);
        }
    }

    onEfetuar() {
        if (this.manutencaoForm.invalid) {
            this.manutencaoForm.markAllAsTouched();
            return;
        }

        const manutencao = this.manutencaoForm.value.descricaoManutencao;
        const observacao = this.manutencaoForm.value.instrucoesCliente;

        this.requestService.manutencao(this.requestId!, manutencao!, observacao!).subscribe((updatedRequest: Request) => {
            this.router.navigate(['/funcionario/solicitacoes'])
        });
    }

    onRedirecionar()  {
        if (this.redirecionarForm.invalid) {
            this.redirecionarForm.markAllAsTouched();
            return;
        }

        this.requestService.redirecionarSolicitacao(this.requestId!, this.redirecionarForm.value.funcionarioDestino!
        ).subscribe((updatedRequest: Request) => {
            this.router.navigate(['/funcionario/solicitacoes'])
        });
    }
}