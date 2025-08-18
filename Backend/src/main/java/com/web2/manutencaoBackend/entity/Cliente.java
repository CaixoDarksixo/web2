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
    private String CPF;
    private int telefone;
    private String nome, email, endereco;

    public Cliente() {
    }


    public Cliente(String CPF, int telefone, String nome, String email, String endereco) {
        this.CPF = CPF;
        this.telefone = telefone;
        this.nome = nome;
        this.email = email;
        this.endereco = endereco;
    }
}
