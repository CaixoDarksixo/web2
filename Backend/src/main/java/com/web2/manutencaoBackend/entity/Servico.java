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
    private CategoriaE categoriaEquipamento;

    private String descDefeito;
    private Long idCliente;

    private String descRejeicao;

    protected Servico(){}

    public Servico(LocalDateTime datahora, Status status, String descEquipamento, CategoriaE categoriaEquipamento, String descDefeito, Long idCliente) {
        this.datahora = datahora;
        this.status = status;
        this.descEquipamento = descEquipamento;
        this.categoriaEquipamento = categoriaEquipamento;
        this.descDefeito = descDefeito;
        this.idCliente = idCliente;
        this.descRejeicao = "Não Rejeitada";
    }
    
    public void setId(Long id) {
    	this.id = id;
    }
    
    public Long getId() {
    	return this.id;
    }
    
    public void setDatahora(LocalDateTime datahora) {
    	this.datahora = datahora;
    }
    
    public LocalDateTime getDatahora() {
    	return datahora;
    }
    
    public void setStatus(Status status) {
    	this.status = status;
    }
    
    public Status getStatus() {
    	return this.status;
    }
    
    public void setDescEquipamento(String desc) {
    	this.descEquipamento = desc;
    }
    
    public String getDescEquipamento() {
    	return this.descEquipamento;
    }
    
    public void setCategoriaEquipamento(CategoriaE categoria) {
    	this.categoriaEquipamento = categoria;
    }
    
    public CategoriaE getCategoriaEquipamento() {
    	return categoriaEquipamento;
    }
    
    public void setDescDefeito(String desc) {
    	this.descDefeito = desc;
    }
    
    public String getDescDefeito() {
    	return descDefeito;
    }

    public void setDescRejeicao(String desc) {
    	this.descRejeicao = desc;
    }
    
    public String getDescRejeicao() {
    	return descRejeicao;
    }
    
    public void setIdCliente(Long idCliente) {
    	this.idCliente = idCliente;
    }
    
    public Long getIdCliente() {
    	return this.idCliente;
    }
}
