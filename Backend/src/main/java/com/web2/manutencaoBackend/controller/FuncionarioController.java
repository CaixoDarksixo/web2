package com.web2.manutencaoBackend.controller;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.web2.manutencaoBackend.entity.Funcionario;
import com.web2.manutencaoBackend.service.FuncionarioService;
;


@RestController
@RequestMapping("/funcionario")
public class FuncionarioController {

    private final FuncionarioService funcionarioService;

    public FuncionarioController(FuncionarioService funcionarioService) {
        this.funcionarioService = funcionarioService;
    }

    @GetMapping
    public List<Funcionario> getAll() {
        return funcionarioService.getAll();
    }

    @PostMapping
    public ResponseEntity<Funcionario> post(@RequestBody Funcionario funcionario) {
        if (funcionarioService.findByEmail(funcionario.getEmail()).isPresent()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        try {
            Funcionario novoFuncionario = funcionarioService.save(funcionario);
            return new ResponseEntity<>(novoFuncionario, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        funcionarioService.delete(id);
    }

    @PutMapping("/{id}")
    public Funcionario put(@PathVariable Long id, @RequestBody Funcionario funcionario){
        return funcionarioService.update(id, funcionario);
    }


}
