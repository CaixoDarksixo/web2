package com.web2.manutencaoBackend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.web2.manutencaoBackend.entity.Cliente;
import com.web2.manutencaoBackend.entity.UserRole;
import com.web2.manutencaoBackend.repository.ClienteRepository;

import jakarta.transaction.Transactional;

@Transactional
@Service
public class ClienteService {

    private final ClienteRepository clienteRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired MailService mailService;

    @Autowired
    public ClienteService(ClienteRepository clienteRepository) {
        this.clienteRepository = clienteRepository;    }


/*  private final RestTemplate restTemplate = new RestTemplate();

    public EnderecoDTO buscarEnderecoPorCep(String cep) {
        String url = "https://viacep.com.br/ws/" + cep + "/json/";
        return restTemplate.getForObject(url, EnderecoDTO.class);
    }
*/

    public Cliente save(Cliente cliente) {
        String senha = String.format("%04d", (int)(Math.random() * 10000));
        mailService.enviarSenha(cliente.getEmail(), senha);
        cliente.setPassword(passwordEncoder.encode(senha));
        cliente.setRole(UserRole.CLIENTE);
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
        c.setPassword(passwordEncoder.encode(cliente.getPassword()));
        c.setCpf(cliente.getCpf());
        c.setEmail(cliente.getEmail());
        c.setEndereco(cliente.getEndereco());
        c.setNome(cliente.getNome());
        c.setTelefone(cliente.getTelefone());
        return clienteRepository.save(c);
    }
}
