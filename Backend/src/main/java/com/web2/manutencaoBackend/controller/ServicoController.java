package com.web2.manutencaoBackend.controller;
import java.util.List;

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
import com.web2.manutencaoBackend.service.ServicoService;


@RestController
@RequestMapping("/servico")
public class ServicoController {

    private final ServicoService servicoService;
    private final HistoricosService historicosService;
    private final ClienteRepository clienteRepository;

    public ServicoController(ServicoService servicoService, HistoricosService historicosService, ClienteRepository clienteRepository) {
        this.servicoService = servicoService;
        this.historicosService = historicosService;
        this.clienteRepository = clienteRepository;
    }

    @GetMapping
    public List<Servico> getAll() {
        return servicoService.getAll();
    }

    @PostMapping
    public ResponseEntity<Servico> post(@RequestBody Servico servico, Authentication authentication) {
        String email = authentication.getName();        //pega o cliente logado
        Cliente c = clienteRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("Cliente não encontrado"));
        servico.setCliente(c);
        historicosService.save(servico, null, null);
        servicoService.save(servico); 
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
        return servicoService.pagaServico(id, observacao, pagamento);
    }

    @PutMapping("/orcar/{id}")
    public Servico orcarServico(@PathVariable Long id,
                                @RequestParam String observacao,
                                @RequestBody Orcamento orcamento) {
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
