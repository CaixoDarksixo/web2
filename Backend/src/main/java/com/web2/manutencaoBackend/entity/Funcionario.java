package com.web2.manutencaoBackend.entity;

import java.time.LocalDate;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@DiscriminatorValue("FUNCIONARIO")
public class Funcionario extends User {
    private String nome;
    private String email;
    private LocalDate dataNascimento;

    public Funcionario(String email, String password, UserRole role, String nome,
                       LocalDate dataNascimento) {
        super(email, password, role);
        this.nome = nome;
        this.email = email;
        this.dataNascimento = dataNascimento;
    }
}
