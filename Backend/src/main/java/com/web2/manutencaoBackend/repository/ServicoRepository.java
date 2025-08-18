package com.web2.manutencaoBackend.repository;

import com.web2.manutencaoBackend.entity.Servico;

import org.springframework.data.jpa.repository.JpaRepository;

public interface  ServicoRepository extends JpaRepository<Servico, Long>{
}