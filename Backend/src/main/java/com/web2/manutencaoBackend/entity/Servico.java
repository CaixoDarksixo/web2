package com.web2.manutencaoBackend.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Servico {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime datahora;

    @Enumerated(EnumType.STRING)
    private Status status;

    private String descEquipamento;

    @Enumerated(EnumType.STRING)
    private CategoriaE categoriaEquipamento;

    private String descDefeito;
    private Long idCliente;

    protected Servico(){}

    public Servico(LocalDateTime datahora, Status status, String descEquipamento, CategoriaE categoriaEquipamento, String descDefeito, Long idCliente) {
        this.datahora = datahora;
        this.status = status;
        this.descEquipamento = descEquipamento;
        this.categoriaEquipamento = categoriaEquipamento;
        this.descDefeito = descDefeito;
        this.idCliente = idCliente;
    }
}
