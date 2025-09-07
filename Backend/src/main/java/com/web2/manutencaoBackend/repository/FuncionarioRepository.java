package com.web2.manutencaoBackend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.web2.manutencaoBackend.entity.Funcionario;

public interface FuncionarioRepository extends JpaRepository<Funcionario, Long>{
    // Método para buscar um funcionário pelo seu email de login
    Optional<Funcionario> findByEmail(String email);

    // Método para buscar um funcionário por ID (já disponível com o JpaRepository, mas pode ser útil para clareza)
    Optional<Funcionario> findById(Long id);
}
