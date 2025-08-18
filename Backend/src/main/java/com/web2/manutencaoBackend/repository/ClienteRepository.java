package com.web2.manutencaoBackend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.web2.manutencaoBackend.entity.Cliente;

public interface  ClienteRepository extends JpaRepository<Cliente, Long>{
    Optional<Cliente> findByCpf(String CPF);
}