package com.web2.manutencaoBackend.service;

import org.springframework.stereotype.Service;

import com.web2.manutencaoBackend.entity.Funcionario;
import com.web2.manutencaoBackend.repository.FuncionarioRepository;

import jakarta.transaction.Transactional;

@Transactional
@Service
public class FuncionarioService {

    private final FuncionarioRepository funcionarioRepository;

    public FuncionarioService(FuncionarioRepository funcionarioRepository) {
        this.funcionarioRepository = funcionarioRepository;
    }

    public Funcionario save(Funcionario funcionario) {
        return funcionarioRepository.register(funcionario);
    }
}
