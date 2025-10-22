package com.web2.manutencaoBackend.dto;

import java.time.LocalDateTime;

import com.web2.manutencaoBackend.entity.Funcionario;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FuncionarioResponseDTO {

    private Long id;
    private String nome;
    private String email;
    private LocalDateTime dataRegistro;
    private boolean ativo;

    public Funcionario getFuncionario() {
        Funcionario funcionario = new Funcionario();
        funcionario.setId(this.id);
        funcionario.setNome(this.nome);
        funcionario.setEmail(this.email);
        funcionario.setDataRegistro(this.dataRegistro);
        funcionario.setAtivo(this.ativo);
        return funcionario;
    }
}