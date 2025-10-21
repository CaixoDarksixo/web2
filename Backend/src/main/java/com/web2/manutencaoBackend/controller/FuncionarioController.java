package com.web2.manutencaoBackend.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.web2.manutencaoBackend.dto.FuncionarioResponseDTO;
import com.web2.manutencaoBackend.entity.Funcionario;
import com.web2.manutencaoBackend.service.FuncionarioService;

@RestController
@RequestMapping("/funcionarios")
public class FuncionarioController {

    private final FuncionarioService funcionarioService;

    public FuncionarioController(FuncionarioService funcionarioService) {
        this.funcionarioService = funcionarioService;
    }

    @GetMapping
    public ResponseEntity<List<FuncionarioResponseDTO>> getAll() {
        List<FuncionarioResponseDTO> funcionarios = funcionarioService.getAll();
        return ResponseEntity.ok(funcionarios);
    }

    @GetMapping("/ativos")
    public ResponseEntity<List<FuncionarioResponseDTO>> getAllActive() {
        List<FuncionarioResponseDTO> ativos = funcionarioService.getAllActive();
        return ResponseEntity.ok(ativos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Funcionario> getById(@PathVariable Long id) {
        Optional<Funcionario> funcionario= funcionarioService.findById(id);
        return funcionario.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/email")
    public ResponseEntity<Funcionario> getByEmail(@RequestParam String email) {
        Optional<Funcionario> funcionario = funcionarioService.findByEmail(email);
        return funcionario.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Funcionario> create(@RequestBody Funcionario funcionario) {
        if (funcionarioService.findByEmail(funcionario.getEmail()).isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        Funcionario novo = funcionarioService.save(funcionario.getRequestDTO()).getFuncionario();
        return ResponseEntity.status(HttpStatus.CREATED).body(novo);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Funcionario> update(@PathVariable Long id, @RequestBody Funcionario funcionario) {
        Funcionario atualizado = funcionarioService.update(id, funcionario.getRequestDTO()).getFuncionario();
        return ResponseEntity.ok(atualizado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        funcionarioService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
