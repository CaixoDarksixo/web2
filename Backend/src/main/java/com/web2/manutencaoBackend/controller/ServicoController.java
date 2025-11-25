package com.web2.manutencaoBackend.controller;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.web2.manutencaoBackend.entity.Cliente;
import com.web2.manutencaoBackend.entity.Funcionario;
import com.web2.manutencaoBackend.entity.Historicos;
import com.web2.manutencaoBackend.entity.Orcamento;
import com.web2.manutencaoBackend.entity.Pagamento;
import com.web2.manutencaoBackend.entity.Servico;
import com.web2.manutencaoBackend.entity.Status;
import com.web2.manutencaoBackend.repository.ClienteRepository;
import com.web2.manutencaoBackend.repository.FuncionarioRepository;
import com.web2.manutencaoBackend.service.CategoriaService;
import com.web2.manutencaoBackend.service.HistoricosService;
import com.web2.manutencaoBackend.service.OrcamentoService;
import com.web2.manutencaoBackend.service.PagamentoService;
import com.web2.manutencaoBackend.service.ServicoService;



@RestController
@RequestMapping("/servicos")
public class ServicoController {

    private final ServicoService    servicoService;
    private final HistoricosService historicosService;
    private final ClienteRepository clienteRepository;
    private final OrcamentoService  orcamentoService;
    private final PagamentoService  pagamentoService;
    @Autowired
    CategoriaService categoriaService;
    @Autowired
    FuncionarioRepository funcionarioRepository;

    public ServicoController(ServicoService servicoService, HistoricosService historicosService, 
                            ClienteRepository clienteRepository, OrcamentoService orcamentoService, PagamentoService pagamentoService) {
        this.servicoService = servicoService;
        this.historicosService = historicosService;
        this.clienteRepository = clienteRepository;
        this.orcamentoService = orcamentoService;
        this.pagamentoService = pagamentoService;
    }

    @GetMapping
    public ResponseEntity<List<Servico>> filtrarServicos(
            @RequestParam(required = false) Long clienteId,
            @RequestParam(required = false) Long funcionarioId,
            @RequestParam(required = false) Status estado,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDateTime dataInicio,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDateTime dataFim
    ) {
        List<Servico> servicos = servicoService.filtrarServicos(clienteId, funcionarioId, estado, dataInicio, dataFim);
        return ResponseEntity.ok(servicos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Servico> getById(@PathVariable Long id) {
        Servico servico = servicoService.findById(id);
        return ResponseEntity.ok(servico);
    }

    @PostMapping
    public ResponseEntity<Servico> post(@RequestBody Servico servico, Authentication authentication) {
        String email = authentication.getName();
        Cliente c = clienteRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("Cliente não encontrado"));
        servico.setCliente(c);

        if (servico.getCategoriaEquipamento() != null && servico.getCategoriaEquipamento().getId() != null){
            servico.setCategoriaEquipamento(categoriaService.findById(servico.getCategoriaEquipamento().getId())
                                                .orElseThrow(() -> new RuntimeException("Equipamento não encontrado")));
        }

        servicoService.save(servico); 
        historicosService.save(servico, null, null);
        return ResponseEntity.ok(servico);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        servicoService.delete(id);
    }

    @PostMapping("/{id}")
    public Servico put(@PathVariable Long id, @RequestBody Servico servico, @RequestBody String observacao){
        Servico serAtual = servicoService.findById(id);
        Status anterior = serAtual.getStatus();
        Servico serNovo = servicoService.update(id, servico);
        historicosService.save(serNovo, anterior, observacao); 
        return serNovo;
    }

    @PostMapping("/aprovar/{id}")
    public Servico aprovaServico(@PathVariable Long id,
                                Authentication authentication) {
        return servicoService.aprovaServico(id);
    }

    @PostMapping("/rejeitar/{id}")
    public Servico rejeitaServico(@PathVariable Long id,
                                  @RequestBody Map<String, String> payload,
                                  Authentication authentication) {
        String motivo = payload.get("descRejeicao");                            
        return servicoService.rejeitaServico(id, motivo);
    }

    @PostMapping("/resgatar/{id}")
    public Servico resgataServico(@PathVariable Long id,
                                    Authentication authentication) {
        return servicoService.resgataServico(id);
    }

    @PostMapping("/pagar/{id}")
    public Servico pagaServico(@PathVariable Long id,
                               @RequestBody Map<String, String> payload,
                                Authentication authentication) {
        double valorPago = Double.parseDouble(payload.get("valorPago"));
        Pagamento pagamento = new Pagamento();
        pagamento.setValorPago(valorPago);
        pagamento.setOrcamento(servicoService.findById(id).getOrcamento());
        Pagamento pagSalvo = pagamentoService.save(pagamento, servicoService.findById(id).getOrcamento());
        return servicoService.pagaServico(id, pagSalvo);
    }

    @PostMapping("/orcar/{id}")
    public Servico orcarServico(@PathVariable Long id,
                                @RequestBody Orcamento orcamento,
                                Authentication authentication) {
        String email = authentication.getName();
        Funcionario f = funcionarioRepository.findByEmail(email)
                            .orElseThrow(() -> new RuntimeException("Funcionario não encontrado"));
        orcamento.setFuncionario(f);
        Orcamento orcSalvo = orcamentoService.save(orcamento, orcamento.getValor());
        return servicoService.orcarServico(id, orcSalvo);
    }

    @PostMapping("/manutencao/{id}")
    public Servico efetuarManutencao(@PathVariable Long id,
                                    @RequestBody Map<String, String> payload,
                                    Authentication authentication) {
        String manutencao = payload.get("manutencao");
        String observacao = payload.get("observacao");
        String email = authentication.getName();
        Funcionario f = funcionarioRepository.findByEmail(email)
                            .orElseThrow(() -> new RuntimeException("Funcionario não encontrado"));
        return servicoService.efetuarManutencao(id, manutencao, observacao, f);
    }

    @PostMapping("/redirecionar/{id}")
    public Servico redirecionarServico(@PathVariable Long id,
                                        @RequestBody Map<String, Long> payload,
                                    Authentication authentication) {
        String email = authentication.getName();
        Long funcionarioId = payload.get("funcionarioId");
        Funcionario f = funcionarioRepository.findByEmail(email)
                            .orElseThrow(() -> new RuntimeException("Funcionario não encontrado"));
        Funcionario funcionario = funcionarioRepository.findById(funcionarioId)
                                    .orElseThrow(() -> new RuntimeException("Funcionario destino não encontrado"));
        return servicoService.redirecionarServico(id, f, funcionario);
    }

    @PostMapping("/finalizar/{id}")
    public Servico finalizarServico(@PathVariable Long id,
                                    Authentication authentication) {
        String email = authentication.getName();
        Funcionario f = funcionarioRepository.findByEmail(email)
                            .orElseThrow(() -> new RuntimeException("Funcionario não encontrado"));
        return servicoService.finalizarServico(id, f);
    }

    @GetMapping("/historico/{id}")
    public List<Historicos> getHistoricos(@PathVariable Long id) {
        return historicosService.getHistorico(id);
    }

    @GetMapping("/orcamento/{id}")
    public Orcamento getOrcamentoByServicoId(@PathVariable Long id) {
        Servico servico = servicoService.findById(id);
        return servico.getOrcamento();
    }
}
