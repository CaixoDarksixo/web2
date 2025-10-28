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
public class Pagamento {
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "orcamento_Id")
    private Orcamento orcamento;
    private Double valorPago;
    @CreationTimestamp
    private LocalDateTime dataHoraPagamento;

    public Pagamento() {}

    public Pagamento(Long id, Orcamento orcamento, LocalDateTime dataHoraPagamento) {
        this.orcamento = orcamento;
        this.valorPago = orcamento.getValor();
        this.dataHoraPagamento = dataHoraPagamento;
    }
}
