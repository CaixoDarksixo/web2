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
import com.web2.manutencaoBackend.entity.Status;
import com.web2.manutencaoBackend.service.HistoricosService;
import com.web2.manutencaoBackend.service.ServicoService;


@RestController
@RequestMapping("/servico")
public class ServicoController {

    private final ServicoService servicoService;
    private final HistoricosService historicosService;

    public ServicoController(ServicoService servicoService, HistoricosService historicosService) {
        this.servicoService = servicoService;
        this.historicosService = historicosService;
    }

    @GetMapping
    public List<Servico> getAll() {
        return servicoService.getAll();
    }

    @PostMapping
    public Servico post(@RequestBody Servico servico) {
        historicosService.save(servico, null, null);
        return servicoService.save(servico);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        servicoService.delete(id);
    }

    @PutMapping("/{id}")
    public Servico put(@PathVariable Long id, @RequestBody Servico servico, @RequestBody String observacao){
        Servico serAtual = servicoService.findById(id);
        Status anterior = serAtual.getStatus();
        Servico serNovo = servicoService.update(id, servico);
        historicosService.save(serNovo, anterior, observacao); 
        return serNovo;
    }

}
