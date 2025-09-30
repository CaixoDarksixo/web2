package com.web2.manutencaoBackend.entity;

import com.web2.manutencaoBackend.entity.UserRole;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record RegisterDTO (
    @NotBlank(message = "O e-mail é obrigatório.")
    @Email(message = "O e-mail deve ser válido.")
    String email,

    @NotBlank(message = "A senha é obrigatória.")
    @Size(min = 4, message = "A senha deve ter pelo menos 4 caracteres.")
    String senha,

    UserRole role
){ }
