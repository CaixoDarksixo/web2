package com.web2.manutencaoBackend.entity;

import java.time.LocalDateTime;

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
import lombok.Setter;

@Setter
@Getter
@Entity
@Table(name = "historicos")
public class Historicos {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "servico_id")
    private Servico solicitacao;

    @CreationTimestamp
    private LocalDateTime datahora;

    @Enumerated(EnumType.STRING)
    private Status statusAnterior;

    @Enumerated(EnumType.STRING)
    private Status statusAtual;

    @ManyToOne
    @JoinColumn(name = "categoria_id")
    private CategoriaE categoriaEquipamento;

    private String descDefeito;

    @ManyToOne
    @JoinColumn(name = "cliente_id")
    private Cliente cliente;

    private String descRejeicao;

    private String descManutencao;

    private String observacao;

    @ManyToOne
    @JoinColumn(name = "funcionario_id")
    private Funcionario funcionario;

    public Historicos() {}

    public Historicos(Servico solicitacao, Status statusAnterior, Status statusAtual, CategoriaE categoriaEquipamento,
                      String descDefeito, Cliente cliente, String descRejeicao, String descManutencao, String observacao, Funcionario funcionario) {
        this.solicitacao = solicitacao;
        this.statusAnterior = statusAnterior;
        this.statusAtual = statusAtual;
        this.categoriaEquipamento = categoriaEquipamento;
        this.descDefeito = descDefeito;
        this.cliente = cliente;
        this.descRejeicao = descRejeicao;
        this.descManutencao = descManutencao;
        this.observacao = observacao;
        this.funcionario = funcionario;
    }
    
}