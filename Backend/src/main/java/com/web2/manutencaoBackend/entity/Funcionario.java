package com.web2.manutencaoBackend.entity;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Funcionario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome, email;
    private Date dataNascimento;

    public Funcionario() {
    }

    public Funcionario(Long id, String nome, String email, Date dataNascimento) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.dataNascimento = dataNascimento;
    }
    
    public void setId(Long id) {
    	this.id = id;
    }
    
    public Long getId() {
    	return id;
    }
    
    public void setNome(String nome) {
    	this.nome = nome;
    }
    
    public String getNome() {
    	return this.nome;
    }
    
    public void setEmail(String email) {
    	this.email = email;
    }

    public String getEmail() {
    	return this.email;
    }
    
    public void setDataNascimento(Date data) {
    	this.dataNascimento = data;
    }
    
    public Date getDataNascimento() {
    	return dataNascimento;
    }
}
