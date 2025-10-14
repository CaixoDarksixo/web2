package com.web2.manutencaoBackend.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data; 
import lombok.NoArgsConstructor;


@Entity
@Table(name = "tb_funcionario")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Funcionario {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; 
    
    private String nome;
    private String email;
    private String password; 
    
    private LocalDateTime dataNascimento; 
    private LocalDateTime dataRegistro;

    private boolean ativo; 
    
    @Enumerated(EnumType.STRING)
    private UserRole role; 
    

}