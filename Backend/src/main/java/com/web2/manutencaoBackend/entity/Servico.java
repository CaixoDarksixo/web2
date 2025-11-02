package com.web2.manutencaoBackend.entity;

import java.time.LocalDate;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "servicos")
public class Servico {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @CreationTimestamp
    private LocalDate dataInicio;

    @CreationTimestamp
    private LocalDate dataFim;

    @Enumerated(EnumType.STRING)
    private Status status;

    private String descEquipamento;

    @ManyToOne
    @JoinColumn(name = "categoria_id")
    private CategoriaE categoriaEquipamento;

    private String descDefeito;

    @ManyToOne
    @JoinColumn(name = "cliente_id")
    private Cliente cliente;

    private String descRejeicao;

    private String descManutencao;

    @ManyToOne
    @JoinColumn(name = "funcionario_id")
    private Funcionario funcionario;

    @ManyToOne
    @JoinColumn(name = "orcamento_id")
    private Orcamento orcamento;

    @ManyToOne
    @JoinColumn(name = "pagamento_id")
    private Pagamento pagamento;
    private Boolean ativo;

    public Servico(LocalDate dataInicio, Status status, String descEquipamento, CategoriaE categoriaEquipamento, String descDefeito, Cliente cliente) {
        this.dataInicio = dataInicio;
        this.dataFim = null;
        this.status = Status.ABERTA;
        this.descEquipamento = descEquipamento;
        this.categoriaEquipamento = categoriaEquipamento;
        this.descDefeito = descDefeito;
        this.cliente = cliente;
        this.descRejeicao = "Não Rejeitada";
        this.funcionario = null;
        this.orcamento = null;
        this.pagamento = null;
        this.ativo = true;
    }

    public void rejeitar(String desc) {
        this.setDescRejeicao(desc);
        this.setStatus(Status.REJEITADA);
    }

    public void encaminhar(Funcionario funcionario) {
        this.setFuncionario(funcionario);
    }

    public Status getStatus() {
        return this.status;
    }
}
