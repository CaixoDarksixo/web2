package com.web2.manutencaoBackend.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.web2.manutencaoBackend.entity.Funcionario;
import com.web2.manutencaoBackend.entity.Orcamento;
import com.web2.manutencaoBackend.entity.Pagamento;
import com.web2.manutencaoBackend.entity.Servico;
import com.web2.manutencaoBackend.entity.Status;
import com.web2.manutencaoBackend.repository.ServicoRepository;

import jakarta.transaction.Transactional;

@Transactional
@Service
public class ServicoService {
    
    private final ServicoRepository servicoRepository;
    private final HistoricosService historicosService;

    public ServicoService(ServicoRepository servicoRepository, HistoricosService historicosService, PagamentoService pagamentoService, OrcamentoService orcamentoService){
        this.servicoRepository = servicoRepository;
        this.historicosService = historicosService;

    }

    public Servico findById(Long id){
        Servico s = servicoRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Servico não encontrado"));
        return s;
    }

    public List<Servico> getAll(){
        return servicoRepository.findAll();
    }

    public Servico save(Servico servico) {
        servico.setDataInicio(LocalDateTime.now());
        servico.setAtivo(true);
        return servicoRepository.save(servico);
    }

    public boolean delete(Long id) {
        Servico servico = servicoRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente não encontrado"));
        servico.setAtivo(false);
        servicoRepository.save(servico);
        return true;
    }

    public Servico update(Long id, Servico servico) {
        Servico s = servicoRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Servico não encontrado"));
        s.setDataInicio(servico.getDataInicio());
        s.setDataFim(servico.getDataFim());
        s.setStatus(servico.getStatus());
        s.setDescEquipamento(servico.getDescEquipamento());
        s.setCategoriaEquipamento(servico.getCategoriaEquipamento());
        s.setDescDefeito(servico.getDescDefeito());
        s.setCliente(servico.getCliente());
        s.setDescRejeicao(servico.getDescRejeicao());
        s.setFuncionario(servico.getFuncionario());
        return servicoRepository.save(s);
    }

    public Servico aprovaServico(Long id) {
        Servico servico = servicoRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Serviço não encontrado"));

        Status anterior = servico.getStatus();
        servico.setStatus(Status.APROVADA);
        Servico atualizado = servicoRepository.save(servico);
        String observacao = "Serviço aprovado pelo cliente.";
        historicosService.save(atualizado, anterior, observacao);

        return atualizado;
    }

    public Servico rejeitaServico(Long id, String descRejeicao) {
        Servico servico = servicoRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Serviço não encontrado"));

        Status anterior = servico.getStatus();
        servico.setStatus(Status.REJEITADA);
        servico.setDescRejeicao(descRejeicao);
        Servico atualizado = servicoRepository.save(servico);
        String observacao = "Serviço rejeitado: " + descRejeicao;
        historicosService.save(atualizado, anterior, observacao);

        return atualizado;
    }

    public Servico resgataServico(Long id) {
        Servico servico = servicoRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Serviço não encontrado"));

        Status anterior = servico.getStatus();
        servico.setStatus(Status.APROVADA);
        Servico atualizado = servicoRepository.save(servico);
        String observacao = "Serviço resgatado pelo cliente";
        historicosService.save(atualizado, anterior, observacao);

        return atualizado;
    }

    public Servico pagaServico(Long id, Pagamento pagamento) {
        Servico servico = servicoRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Serviço não encontrado"));

        Status anterior = servico.getStatus();
        servico.setStatus(Status.PAGA);
        servico.setPagamento(pagamento);
        Servico atualizado = servicoRepository.save(servico);
        String observacao = "Serviço pago com o pagamento ID: " + pagamento.getId();
        historicosService.save(atualizado, anterior, observacao);

        return atualizado;
    }

    public Servico orcarServico(Long id, Orcamento orcamento){ /////////////////////////////////
        Servico servico = servicoRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Serviço não encontrado"));

        Status anterior = servico.getStatus();
        servico.setStatus(Status.ORCADA);
        servico.setOrcamento(orcamento);
        Servico atualizado = servicoRepository.save(servico);
        String observacao = "Serviço orçado com o orçamento ID: " + orcamento.getId();
        historicosService.save(atualizado, anterior, observacao);
        
        return atualizado;
    }

    public Servico efetuarManutencao(Long id, String manutencao, String observacao, Funcionario f){
        Servico servico = servicoRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Serviço não encontrado"));

        Status anterior = servico.getStatus();
        servico.setStatus(Status.ARRUMADA);
        servico.setDescManutencao(manutencao);
        servico.setObservacao(observacao);
        Servico atualizado = servicoRepository.save(servico);
        historicosService.save(atualizado, anterior, observacao);
        
        return atualizado;
    }

    public Servico redirecionarServico(Long id, Funcionario funcionario, Funcionario funcionarioDest){
        Servico servico = servicoRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Serviço não encontrado"));

        Status anterior = servico.getStatus();
        servico.setStatus(Status.REDIRECIONADA);
        servico.setFuncionario(funcionarioDest);
        Servico atualizado = servicoRepository.save(servico);
        String observacao = "Serviço redirecionado pelo funcionário: " + funcionario.getNome();
        historicosService.save(atualizado, anterior, observacao);
        
        return atualizado;
    }    

    public Servico finalizarServico(Long id, Funcionario f){
        Servico servico = servicoRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Serviço não encontrado"));

        Status anterior = servico.getStatus();
        servico.setFuncionario(f);
        servico.setStatus(Status.FINALIZADA);
        Servico atualizado = servicoRepository.save(servico);
        String observacao = "Serviço finalizado pelo funcionário: " + f.getNome();
        historicosService.save(atualizado, anterior, observacao);
        
        return atualizado;
    }

    
    public List<Servico> filtrarServicos(Long clienteId, Long funcionarioId, Status estado,
                                        LocalDateTime dataInicio, LocalDateTime dataFim) {

        return servicoRepository.filtrarServicos(clienteId, funcionarioId, estado, dataInicio, dataFim);
    }


}
