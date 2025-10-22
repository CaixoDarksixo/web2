package com.web2.manutencaoBackend.entity;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Orcamento {
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "servico_Id")
    private Servico servico;
    @ManyToOne
    @JoinColumn(name = "funcionario_Id")
    private Funcionario funcionario;
    private Double valor;
    @CreationTimestamp
    private LocalDateTime dataHora;

    public Orcamento(Long id, Servico servico, Funcionario funcionario, Double valor, LocalDateTime dataHora) {
        this.servico = servico;
        this.funcionario = funcionario;
        this.valor = valor;
        this.dataHora = dataHora;
    }


}
