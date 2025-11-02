package com.web2.manutencaoBackend.entity;

import java.time.LocalDateTime;

import com.web2.manutencaoBackend.dto.FuncionarioRequestDTO;
import com.web2.manutencaoBackend.dto.FuncionarioResponseDTO;

import jakarta.persistence.DiscriminatorValue;
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
@DiscriminatorValue("FUNCIONARIO")
@Data
@NoArgsConstructor
public class Funcionario extends User{
    
    private String nome;
    private String email;
    
    private LocalDateTime dataNascimento; 

    public Funcionario(Long id, String password, UserRole role, String nome, String email, LocalDateTime dataNascimento, LocalDateTime dataRegistro) {
        super(email, password, role, dataRegistro);
        this.nome = nome;
        this.email = email;
        this.dataNascimento = dataNascimento;
    }



//    public FuncionarioRequestDTO getRequestDTO() {
//        FuncionarioRequestDTO dto = new FuncionarioRequestDTO();
//        dto.setNome(this.nome);
//        dto.setEmail(this.email);
//        return dto;
//    }

  //  public FuncionarioResponseDTO getResponseDTO() {
  //      FuncionarioResponseDTO dto = new FuncionarioResponseDTO();
  //      dto.setNome(this.nome);
   //     dto.setEmail(this.email);
  //      return dto;
  //  }
    

}