package com.web2.manutencaoBackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.web2.manutencaoBackend.entity.Pagamento;

public interface  PagamentoRepository extends JpaRepository<Pagamento, Long>{

}
