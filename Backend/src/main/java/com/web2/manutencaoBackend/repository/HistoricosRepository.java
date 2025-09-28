package com.web2.manutencaoBackend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.web2.manutencaoBackend.entity.Historicos;

public interface HistoricosRepository extends JpaRepository<Historicos, Long>{
    
    List<Historicos> findBySolicitacaoId(Long solicitacaoId);
}
