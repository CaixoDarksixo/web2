package com.web2.manutencaoBackend.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.web2.manutencaoBackend.entity.Cliente;
import com.web2.manutencaoBackend.entity.Servico;
import com.web2.manutencaoBackend.entity.Status;

public interface ServicoRepository extends JpaRepository<Servico, Long>{
    
    // Método para buscar todos os serviços de um cliente específico
    List<Servico> findByCliente(Cliente cliente);
    
    // Método para buscar serviços por status
    List<Servico> findByStatus(Status status);


    @Query("""
        SELECT s FROM Servico s
        WHERE (:clienteId IS NULL OR s.cliente.id = :clienteId)
          AND (:funcionarioId IS NULL OR s.funcionario.id = :funcionarioId)
          AND (:estado IS NULL OR s.status = :estado)
          AND (:dataInicio IS NULL OR s.datahora >= :dataInicio)
          AND (:dataFim IS NULL OR s.datahora <= :dataFim)
    """)
    List<Servico> filtrarServicos(
            @Param("clienteId") Long clienteId,
            @Param("funcionarioId") Long funcionarioId,
            @Param("estado") Status estado,
            @Param("dataInicio") LocalDate dataInicio,
            @Param("dataFim") LocalDate dataFim
    );

}
