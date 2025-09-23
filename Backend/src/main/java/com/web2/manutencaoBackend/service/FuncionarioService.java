package com.web2.manutencaoBackend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.web2.manutencaoBackend.entity.Funcionario;
import com.web2.manutencaoBackend.entity.UserRole;
import com.web2.manutencaoBackend.repository.FuncionarioRepository;

import jakarta.transaction.Transactional;

@Transactional
@Service
public class FuncionarioService {

    private final FuncionarioRepository funcionarioRepository;

    public FuncionarioService(FuncionarioRepository funcionarioRepository) {
        this.funcionarioRepository = funcionarioRepository;
    }

    public List<Funcionario> getAll(){
        return funcionarioRepository.findAll();
    }

    public Funcionario save(Funcionario funcionario) {
        funcionario.setRole(UserRole.FUNCIONARIO);
        return funcionarioRepository.save(funcionario);
    }

    public void delete(Long id) {
        if(!funcionarioRepository.existsById(id)){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Funcionario não encontrado");
        }
        funcionarioRepository.deleteById(id);
    }

    public Funcionario update(Long id, Funcionario funcionario) {
        Funcionario f = funcionarioRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Funcionario não encontrado"));
        f.setEmail(funcionario.getEmail());
        f.setNome(funcionario.getNome());
        f.setDataNascimento(funcionario.getDataNascimento());
        return funcionarioRepository.save(f);
    }

    public Optional<Funcionario> findByEmail(String email) {
    return funcionarioRepository.findByEmail(email);
    }
}
