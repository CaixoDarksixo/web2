package com.web2.manutencaoBackend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.web2.manutencaoBackend.entity.CategoriaE;

public interface CategoriaERepository extends JpaRepository<CategoriaE, Long>{

    Optional<CategoriaE> findByNome(String nome);
}
