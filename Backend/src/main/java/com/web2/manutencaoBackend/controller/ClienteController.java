package com.web2.manutencaoBackend.controller;

import com.web2.manutencaoBackend.entity.Cliente;
import com.web2.manutencaoBackend.service.ClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/clientes")
public class ClienteController {

    private final ClienteService clienteService;

    @Autowired
    public ClienteController(ClienteService clienteService) {
        this.clienteService = clienteService;
    }

    // Endpoint para autocadastro (RF001)
    @PostMapping("/autocadastro")
    public ResponseEntity<Cliente> autocadastro(@RequestBody Cliente cliente) {
        // Validação básica para evitar clientes com e-mail ou CPF já cadastrados
        if (clienteService.findByEmail(cliente.getEmail()).isPresent()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        if (clienteService.findByCpf(cliente.getCpf()).isPresent()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        try {
            Cliente novoCliente = clienteService.save(cliente);
            return new ResponseEntity<>(novoCliente, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping
    public List<Cliente> getAll() {
        return clienteService.getAll();
    }

    @PostMapping
    public ResponseEntity<Cliente> post(@RequestBody Cliente cliente) {
        // Este endpoint é para o caso geral de criação, o autocadastro é específico.
        Cliente novoCliente = clienteService.save(cliente);
        return new ResponseEntity<>(novoCliente, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        clienteService.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Cliente> put(@PathVariable Long id, @RequestBody Cliente cliente){
        Cliente clienteAtualizado = clienteService.update(id, cliente);
        return new ResponseEntity<>(clienteAtualizado, HttpStatus.OK);
    }
}
