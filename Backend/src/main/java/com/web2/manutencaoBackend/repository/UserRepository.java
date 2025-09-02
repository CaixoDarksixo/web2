package com.web2.manutencaoBackend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.web2.manutencaoBackend.entity.User;

public interface UserRepository extends JpaRepository<User, Long>{
    // Declaração do método para buscar um usuário pelo login
    Optional<User> findByLogin(String login);

    private void register(User user){

    };

    private void update(User user){

    };

}