package com.web2.manutencaoBackend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Cliente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String cpf;
    private int telefone;
    private String nome, email, endereco;

    public Cliente() {
    }


    public Cliente(String CPF, int telefone, String nome, String email, String endereco) {
        this.cpf = CPF;
        this.telefone = telefone;
        this.nome = nome;
        this.email = email;
        this.endereco = endereco;
    }
    
    public void setId(Long id) {
    	this.id = id;
    }
    
    public Long getId() {
    	return this.id;
    }
    
    public void setCpf(String cpf) {
    	this.cpf = cpf;
    }
    
    public String getCpf() {
    	return this.cpf;
    }
    
    public void setTelefone(int telefone) {
    	this.telefone = telefone;
    }
    
    public int getTelefone() {
    	return this.telefone;
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
    	return email;
    }
    
    public void setEndereco(String endereco) {
    	this.endereco = endereco;
    }
    
    public String getEndereco() {
    	return this.endereco;
    }
}
