package com.web2.manutencaoBackend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "servicos") // Adicionada a anotação @Table
public class Servico {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime datahora;

    @Enumerated(EnumType.STRING)
    private Status status;

    private String descEquipamento;

    @ManyToOne // Mapeamento para a entidade Categoria
    @JoinColumn(name = "categoria_id") // Nome da coluna de chave estrangeira
    private CategoriaE categoriaEquipamento;

    private String descDefeito;

    @ManyToOne // Mapeamento para a entidade Cliente
    @JoinColumn(name = "cliente_id")
    private Cliente cliente;

    private String descRejeicao;

    @ManyToOne // Mapeamento para a entidade Funcionario
    @JoinColumn(name = "funcionario_id")
    private Funcionario funcionario;

    public Servico(LocalDateTime datahora, Status status, String descEquipamento, CategoriaE categoriaEquipamento, String descDefeito, Cliente cliente) {
        this.datahora = datahora;
        this.status = status;
        this.descEquipamento = descEquipamento;
        this.categoriaEquipamento = categoriaEquipamento;
        this.descDefeito = descDefeito;
        this.cliente = cliente;
        this.descRejeicao = "Não Rejeitada";
        this.funcionario = null;
    }

    public void rejeitar(String desc) {
        this.setDescRejeicao(desc);
        this.setStatus(Status.REJEITADA);
    }

    public void encaminhar(Funcionario funcionario) {
        this.setFuncionario(funcionario);
    }
}
