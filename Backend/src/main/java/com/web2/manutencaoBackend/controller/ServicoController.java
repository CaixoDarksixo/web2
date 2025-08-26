package com.web2.manutencaoBackend.controller;
import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.web2.manutencaoBackend.entity.Servico;
import com.web2.manutencaoBackend.service.ServicoService;
;


@RestController
@RequestMapping("/servico")
public class ServicoController {

    private final ServicoService servicoService;

    public ServicoController(ServicoService servicoService) {
        this.servicoService = servicoService;
    }

    @GetMapping
    public List<Servico> getAll() {
        return servicoService.getAll();
    }

    @PostMapping
    public Servico post(@RequestBody Servico servico) {
        return servicoService.save(servico);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        servicoService.delete(id);
    }

    @PutMapping("/{id}")
    public Servico put(@PathVariable Long id, @RequestBody Servico servico){
        return servicoService.update(id, servico);
    }


}
