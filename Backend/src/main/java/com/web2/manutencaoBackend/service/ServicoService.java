package com.web2.manutencaoBackend.service;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.web2.manutencaoBackend.entity.Servico;
import com.web2.manutencaoBackend.repository.ServicoRepository;

import jakarta.transaction.Transactional;

@Transactional
@Service
public class ServicoService {

    private final ServicoRepository servicoRepository;

    public ServicoService(ServicoRepository servicoRepository) {
        this.servicoRepository = servicoRepository;
    }

    public List<Servico> getAll(){
        return servicoRepository.findAll();
    }

    public Servico save(Servico servico) {
        return servicoRepository.save(servico);
    }

    public void delete(Long id) {
        if(!servicoRepository.existsById(id)){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Servico não encontrado");
        }
        servicoRepository.deleteById(id);
    }

    public Servico update(Long id, Servico servico) {
        Servico s = servicoRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Servico não encontrado"));
        s.setDatahora(servico.getDatahora());
        s.setStatus(servico.getStatus());
        s.setDescEquipamento(servico.getDescEquipamento());
        s.setCategoriaEquipamento(servico.getCategoriaEquipamento());
        s.setDescDefeito(servico.getDescDefeito());
        s.setCliente(servico.getCliente());
        s.setDescRejeicao(servico.getDescRejeicao());
        s.setFuncionario(servico.getFuncionario());
        return servicoRepository.save(s);
    }

    public Servico orcamentaServico(){
        return null;
    }

    public Servico manutencaoServico(){
        return null;
    }

    public Servico redirecionarManutencaoServico(){
        return null;
    }

    public Servico finalizarServico(){
        return null;
    }


}
