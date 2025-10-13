package com.web2.manutencaoBackend.entity;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Pagamento {
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Orcamento orcamento;
    private Double valorPago;
    @CreationTimestamp
    private LocalDateTime dataHoraPagamento;

    public Pagamento(Long id, Orcamento orcamento, LocalDateTime dataHoraPagamento) {
        this.orcamento = orcamento;
        this.valorPago = orcamento.getValor();
        this.dataHoraPagamento = dataHoraPagamento;
    }
}
