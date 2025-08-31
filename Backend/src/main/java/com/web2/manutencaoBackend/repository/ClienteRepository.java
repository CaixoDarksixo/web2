package com.web2.manutencaoBackend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.web2.manutencaoBackend.entity.Cliente;

public interface  ClienteRepository extends JpaRepository<Cliente, Long>{
    // Declaração do método para buscar um cliente pelo e-mail
    Optional<Cliente> findByEmail(String email);

    // Declaração do método para buscar um cliente pelo CPF
    Optional<Cliente> findByCpf(String cpf);

    private void register(Cliente cliente){

    };

    private void update(Cliente cliente){

    };


}
