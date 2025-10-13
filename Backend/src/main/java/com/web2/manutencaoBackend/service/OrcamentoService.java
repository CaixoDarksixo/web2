package com.web2.manutencaoBackend.service;

import org.springframework.stereotype.Service;

import com.web2.manutencaoBackend.entity.Orcamento;
import com.web2.manutencaoBackend.entity.Servico;
import com.web2.manutencaoBackend.repository.OrcamentoRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class OrcamentoService {

    private final OrcamentoRepository orcamentoRepository;

    public OrcamentoService(OrcamentoRepository orcamentoRepository) {
        this.orcamentoRepository = orcamentoRepository;
    }

    public Orcamento save(Orcamento orcamento, Servico servico, Double valor){
        orcamento.setServico(servico);
        orcamento.setFuncionario(servico.getFuncionario());
        orcamento.setValor(valor);
        return orcamentoRepository.save(orcamento);
    }
    
}
