package com.web2.manutencaoBackend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.web2.manutencaoBackend.entity.Historicos;
import com.web2.manutencaoBackend.entity.Servico;
import com.web2.manutencaoBackend.entity.Status;
import com.web2.manutencaoBackend.repository.HistoricosRepository;

import jakarta.transaction.Transactional;

@Transactional
@Service
public class HistoricosService {

    private final HistoricosRepository historicosRepository;
    public HistoricosService(HistoricosRepository historicosRepository){
        this.historicosRepository = historicosRepository;
    }

    public List<Historicos> getHistorico(Long id){
        return historicosRepository.findBySolicitacaoId(id);
    }

    public Historicos save(Servico s, Status anterior, String observacao){
        Historicos historico = new Historicos(
            s, 
            anterior, 
            s.getStatus(), 
            s.getCategoriaEquipamento(),
            s.getDescDefeito(), 
            s.getCliente(), 
            s.getDescRejeicao(), 
            s.getDescManutencao(),
            observacao,
            s.getFuncionario()
        );
        return historicosRepository.save(historico);
    }
}
