package com.web2.manutencaoBackend.dto;

import com.web2.manutencaoBackend.entity.Funcionario;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FuncionarioRequestDTO {
    
    @NotBlank(message = "O nome é obrigatório")
    private String nome;
    
    @Email(message = "Email inválido")
    @NotBlank(message = "O email é obrigatório")
    private String email;
    
    @Size(min = 6, message = "A senha deve ter no mínimo 6 caracteres")
    private String password; 
    
    public Funcionario getFuncionario() {
        Funcionario funcionario = new Funcionario();
        funcionario.setNome(this.nome);
        funcionario.setEmail(this.email);
        funcionario.setPassword(this.password);
        return funcionario;
    }
}