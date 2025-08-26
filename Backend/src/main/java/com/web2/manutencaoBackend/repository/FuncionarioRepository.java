package com.web2.manutencaoBackend.repository;

import java.util.Optional;

import com.web2.manutencaoBackend.entity.Funcionario;

import org.springframework.data.jpa.repository.JpaRepository;

public interface  FuncionarioRepository extends JpaRepository<Funcionario, Long>{
    Optional<Funcionario> findByEmail(String email);

    Optional<Funcionario> findByCPF(String cpf);

    private void register(Funcionario funcionario);

    private void update(Funcionario funcionario);

    private void delete(Funcionario funcionario);
}
