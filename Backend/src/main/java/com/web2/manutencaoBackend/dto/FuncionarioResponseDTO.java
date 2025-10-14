package com.web2.manutencaoBackend.dto;

import java.time.LocalDateTime;

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
}