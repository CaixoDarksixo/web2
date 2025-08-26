package com.web2.manutencaoBackend.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.web2.manutencaoBackend.entity.Cliente;
import com.web2.manutencaoBackend.repository.ClienteRepository;

import jakarta.transaction.Transactional;

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
        return clienteRepository.save(cliente);
    }

    // Método para verificar se um cliente já existe pelo e-mail
    public Optional<Cliente> findByEmail(String email) {
        return clienteRepository.findByEmail(email);
    }

    // Método para verificar se um cliente já existe pelo CPF
    public Optional<Cliente> findByCpf(String cpf) {
        return clienteRepository.findByCpf(cpf);
    }

    public List<Cliente> getAll(){
        return clienteRepository.findAll();
    }

    public void delete(Long id) {
        if(!clienteRepository.existsById(id)){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente não encontrado");
        }
        clienteRepository.deleteById(id);
    }

    public Cliente update(Long id, Cliente cliente) {
        Cliente c = clienteRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente não encontrado"));
        c.setCpf(cliente.getCpf());
        c.setEmail(cliente.getEmail());
        c.setEndereco(cliente.getEndereco());
        c.setNome(cliente.getNome());
        c.setTelefone(cliente.getTelefone());
        return clienteRepository.save(c);
    }
}
