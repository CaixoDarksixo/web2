package com.web2.manutencaoBackend.service;

import com.web2.manutencaoBackend.entity.Cliente;
import com.web2.manutencaoBackend.repository.ClienteRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Transactional
@Service
public class ClienteService {

    private final ClienteRepository clienteRepository;
    private final PasswordEncoder passwordEncoder;

    // Construtor com injeção de dependência
    @Autowired
    public ClienteService(ClienteRepository clienteRepository, PasswordEncoder passwordEncoder) {
        this.clienteRepository = clienteRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // Método para autocadastro do cliente (RF001)
    public Cliente save(Cliente cliente) {
        // Criptografa a senha antes de salvar
        cliente.setSenha(passwordEncoder.encode(cliente.getSenha()));
        // Define a data de registro como a data e hora atuais
        cliente.setDataRegistro(LocalDateTime.now());
        // Salva o cliente no banco de dados
        return clienteRepository.register(cliente);
    }

    // Método para verificar se um cliente já existe pelo e-mail
    public Optional<Cliente> findByEmail(String email) {
        return clienteRepository.findByEmail(email);
    }

    // Método para verificar se um cliente já existe pelo CPF
    public Optional<Cliente> findByCpf(String cpf) {
        return clienteRepository.findByCpf(cpf);
    }
}
