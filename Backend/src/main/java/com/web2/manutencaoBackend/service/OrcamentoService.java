package com.web2.manutencaoBackend.service;

import org.springframework.stereotype.Service;

import com.web2.manutencaoBackend.entity.Orcamento;
import com.web2.manutencaoBackend.repository.OrcamentoRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class OrcamentoService {

    private final OrcamentoRepository orcamentoRepository;

    public OrcamentoService(OrcamentoRepository orcamentoRepository) {
        this.orcamentoRepository = orcamentoRepository;
    }

    public Orcamento save(Orcamento orcamento, Double valor){ 
        orcamento.setValor(valor);
        return orcamentoRepository.save(orcamento);
    }
    
    public Orcamento findById(Long id){
        return orcamentoRepository.findById(id).orElse(null);
    }
}
