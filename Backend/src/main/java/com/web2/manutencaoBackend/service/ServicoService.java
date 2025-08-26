package com.web2.manutencaoBackend.service;

import org.springframework.stereotype.Service;

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
    public Servico save(Servico servico) {
        return servicoRepository.register(servico);
    }

}
