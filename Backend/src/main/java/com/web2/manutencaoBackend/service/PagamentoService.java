package com.web2.manutencaoBackend.service;

import org.springframework.stereotype.Service;

import com.web2.manutencaoBackend.entity.Orcamento;
import com.web2.manutencaoBackend.entity.Pagamento;
import com.web2.manutencaoBackend.repository.PagamentoRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class PagamentoService {

    private final PagamentoRepository pagamentoRepository;

    public PagamentoService(PagamentoRepository pagamentoRepository) {
        this.pagamentoRepository = pagamentoRepository;
    }

    public Pagamento save(Pagamento pagamento, Orcamento orcamento){
        pagamento.setOrcamento(orcamento);
        pagamento.setValorPago(orcamento.getValor());
        return pagamentoRepository.save(pagamento);
    }
    
}
