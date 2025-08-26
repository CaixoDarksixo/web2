package com.web2.manutencaoBackend.repository;

import com.web2.manutencaoBackend.entity.Servico;

import org.springframework.data.jpa.repository.JpaRepository;

public interface  ServicoRepository extends JpaRepository<Servico, Long>{
  private void register(Servico servico);

  private void update(Servico servico);

  private void delete(Servico servico);
}
