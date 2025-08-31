package com.web2.manutencaoBackend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.web2.manutencaoBackend.entity.Cliente;

public interface CategoriaERepository extends JpaRepository<Cliente, Long>{
    // Declaração do método para buscar uma categoria pelo nome
    Optional<CategoriaERepository> findByName(String name);

}
