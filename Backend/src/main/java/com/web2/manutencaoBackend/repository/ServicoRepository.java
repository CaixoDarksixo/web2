package com.web2.manutencaoBackend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.web2.manutencaoBackend.entity.Cliente;
import com.web2.manutencaoBackend.entity.Servico;
import com.web2.manutencaoBackend.entity.Status;

public interface ServicoRepository extends JpaRepository<Servico, Long>{
    
    // Método para buscar todos os serviços de um cliente específico
    List<Servico> findByCliente(Cliente cliente);
    
    // Método para buscar serviços por status
    List<Servico> findByStatus(Status status);
    
    // Método para buscar um serviço por ID e ID do cliente
    //Optional<Servico> findByIdAndIdCliente(Long id, Long Cliente);

    // Método para buscar um serviço por ID e ID do funcionário
    //List<Servico> findByIdFuncionario(Long idFuncionario);

}
