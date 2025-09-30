package com.web2.manutencaoBackend.repository;

import java.util.Optional;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.web2.manutencaoBackend.entity.Funcionario;

public interface FuncionarioRepository extends JpaRepository<Funcionario, Long> {

    Optional<Funcionario> findByEmail(String email);

    List<Funcionario> findAllByAtivoTrue();
}
