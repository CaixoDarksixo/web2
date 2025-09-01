package com.web2.manutencaoBackend.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.web2.manutencaoBackend.entity.Cliente;
import com.web2.manutencaoBackend.repository.ClienteRepository;

import jakarta.transaction.Transactional;

@Transactional
@Service
public class ClienteService {

    private final ClienteRepository clienteRepository;
    // private final PasswordEncoder passwordEncoder;

    @Autowired
    public ClienteService(ClienteRepository clienteRepository /* PasswordEncoder passwordEncoder*/ ) {
        this.clienteRepository = clienteRepository;
        // this.passwordEncoder = passwordEncoder;
    }

    public Cliente save(Cliente cliente) {
        //cliente.setSenha(passwordEncoder.encode(cliente.getSenha()));
        cliente.setDataRegistro(LocalDateTime.now());
        return clienteRepository.save(cliente);
    }


     public Optional<Cliente> findByEmail(String email) {
        return clienteRepository.findByEmail(email);
    }

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
