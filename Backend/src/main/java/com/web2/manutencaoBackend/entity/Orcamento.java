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
    private Double valor;
    @CreationTimestamp
    private LocalDateTime dataHora;

    @ManyToOne
    @JoinColumn(name = "funcionario_id")
    private Funcionario funcionario;

    public Orcamento() {
    }

    public Orcamento(Long id, Double valor, LocalDateTime dataHora, Funcionario funcionario) {
        this.valor = valor;
        this.dataHora = dataHora;
        this.funcionario = funcionario;
    }


}
