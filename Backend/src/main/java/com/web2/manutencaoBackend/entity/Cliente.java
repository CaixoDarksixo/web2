package com.web2.manutencaoBackend.entity;

import java.time.LocalDateTime;

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
    private String nome, email, endereco, senha, telefone;
    private LocalDateTime dataRegistro;
    public Cliente() {
    }


    public Cliente(String CPF, String telefone, String nome, String email, String endereco, String senha) {
        this.cpf = CPF;
        this.telefone = telefone;
        this.nome = nome;
        this.email = email;
        this.endereco = endereco;
        this.senha = senha;
    }
    

    //setter e getters
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
    
    public void setTelefone(String telefone) {
    	this.telefone = telefone;
    }


    public void setSenha(String senha){
        this.senha = senha;
    }

    public String getTelefone() {
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
     
    public String getSenha() {
        return senha;
    }

    public LocalDateTime getDataRegistro() {
        return dataRegistro;
    }
    
    public void setDataRegistro(LocalDateTime dataRegistro) {
        this.dataRegistro = dataRegistro;
    }
}
