package com.web2.manutencaoBackend.controller;
import java.time.LocalDate;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.web2.manutencaoBackend.entity.Cliente;
import com.web2.manutencaoBackend.entity.Funcionario;
import com.web2.manutencaoBackend.entity.Orcamento;
import com.web2.manutencaoBackend.entity.Pagamento;
import com.web2.manutencaoBackend.entity.Servico;
import com.web2.manutencaoBackend.entity.Status;
import com.web2.manutencaoBackend.repository.ClienteRepository;
import com.web2.manutencaoBackend.service.HistoricosService;
import com.web2.manutencaoBackend.service.OrcamentoService;
import com.web2.manutencaoBackend.service.PagamentoService;
import com.web2.manutencaoBackend.service.ServicoService;


@RestController
@RequestMapping("/servico")
public class ServicoController {

    private final ServicoService    servicoService;
    private final HistoricosService historicosService;
    private final ClienteRepository clienteRepository;
    private final OrcamentoService  orcamentoService;
    private final PagamentoService  pagamentoService;

    public ServicoController(ServicoService servicoService, HistoricosService historicosService, 
                            ClienteRepository clienteRepository, OrcamentoService orcamentoService, PagamentoService pagamentoService) {
        this.servicoService = servicoService;
        this.historicosService = historicosService;
        this.clienteRepository = clienteRepository;
        this.orcamentoService = orcamentoService;
        this.pagamentoService = pagamentoService;
    }

    @GetMapping("/servicos")
    public ResponseEntity<List<Servico>> filtrarServicos(
            @RequestParam(required = false) Long clienteId,
            @RequestParam(required = false) Long funcionarioId,
            @RequestParam(required = false) Status estado,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dataInicio,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dataFim
    ) {
        List<Servico> servicos = servicoService.filtrarServicos(clienteId, funcionarioId, estado, dataInicio, dataFim);
        return ResponseEntity.ok(servicos);
    }


    @PostMapping
    public ResponseEntity<Servico> post(@RequestBody Servico servico, Authentication authentication) {
        String email = authentication.getName();
        Cliente c = clienteRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("Cliente não encontrado"));
        servico.setCliente(c);
        servicoService.save(servico); 
        historicosService.save(servico, null, null);
        return ResponseEntity.ok(servico);
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

        @PutMapping("/aprovar/{id}")
    public Servico aprovaServico(@PathVariable Long id, @RequestParam String observacao) {
        return servicoService.aprovaServico(id, observacao);
    }

    @PutMapping("/rejeitar/{id}")
    public Servico rejeitaServico(@PathVariable Long id,
                                  @RequestParam String observacao,
                                  @RequestParam String desRejeicao) {
        return servicoService.rejeitaServico(id, observacao, desRejeicao);
    }

    @PutMapping("/resgatar/{id}")
    public Servico resgataServico(@PathVariable Long id, @RequestParam String observacao) {
        return servicoService.resgataServico(id, observacao);
    }

    @PutMapping("/pagar/{id}")
    public Servico pagaServico(@PathVariable Long id,
                               @RequestParam String observacao,
                               @RequestBody Pagamento pagamento) {
        pagamentoService.save(pagamento, servicoService.findById(id).getOrcamento());
        return servicoService.pagaServico(id, observacao, pagamento);
    }

    @PutMapping("/orcar/{id}")
    public Servico orcarServico(@PathVariable Long id,
                                @RequestParam String observacao,
                                @RequestBody Orcamento orcamento) {
        orcamentoService.save(orcamento, servicoService.findById(id), orcamento.getValor());
        return servicoService.orcarServico(id, observacao, orcamento);
    }

    @PutMapping("/manutencao/{id}")
    public Servico efetuarManutencao(@PathVariable Long id,
                                     @RequestParam String manutencao,
                                     @RequestParam String observacao) {
        return servicoService.efetuarManutencao(id, manutencao, observacao);
    }

    @PutMapping("/redirecionar/{id}")
    public Servico redirecionarServico(@PathVariable Long id,
                                      @RequestBody Funcionario funcionario,
                                      @RequestParam String observacao) {
        return servicoService.redirecionarServico(id, funcionario, observacao);
    }

    @PutMapping("/finalizar/{id}")
    public Servico finalizarServico(@PathVariable Long id, @RequestParam String observacao) {
        return servicoService.finalizarServico(id, observacao);
    }
}
