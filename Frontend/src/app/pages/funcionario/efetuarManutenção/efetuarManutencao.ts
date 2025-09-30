import { Component, inject, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RouterModule, Router, ActivatedRoute} from '@angular/router';
import { CommonModule, DatePipe, Location } from '@angular/common';
import { RequestService } from '../service/request.service';
import { DialogModule } from 'primeng/dialog';
import { TextareaModule } from 'primeng/textarea';
import { FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import { MessageModule } from 'primeng/message';
import { SelectModule } from 'primeng/select';
import { AuthService } from '../service/auth.service';

interface Request {
    id: number;
    clienteId: number;
    status: string;
    categoria: string;
    funcionarioAtualId?: number;
    dataHoraAbertura: string;
    descricaoEquipamento: string;
    descricaoProblema: string;
    descricaoManutencao?: string;
    orientacoesCliente?: string;
    dataHoraFechamento?: string;
}

interface Cliente {
  id: number;
  nome: string;
  email: string;
  telefone?: string;
  endereco?: string;
}

interface Funcionario {
  id: number;
  nome: string;
  email: string;
}

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
    SelectModule
    ],
    templateUrl: './efetuarManutencao.html',
    
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
    authService = inject(AuthService);

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
                
            this.requestService.getUserById(this.request.clienteId).subscribe((data: Cliente) => {
                this.cliente = data;
            });
        });

        this.requestService.getFuncionarios().subscribe((data: Funcionario[]) => {
            data = data.filter(f => f.id !== this.currentUser.id);
            this.funcionarios = data;
            console.log(this.funcionarios);
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

        this.requestService.manutencao(this.request.id, {funcionarioId: this.request.funcionarioAtualId!, observacao:""}).subscribe((updatedRequest: Request) => {
            this.router.navigate(['/funcionario/solicitacoes'])
        });
    }

    onRedirecionar()  {
        if (this.redirecionarForm.invalid) {
            this.redirecionarForm.markAllAsTouched();
            return;
        }

        this.requestService.redirecionarSolicitacao(this.request.id, {
            fromFuncionarioId: this.request.funcionarioAtualId!,
            toFuncionarioId: this.redirecionarForm.value.funcionarioDestino!
        }).subscribe((updatedRequest: Request) => {
            this.router.navigate(['/funcionario/solicitacoes'])
        });
    }
}
