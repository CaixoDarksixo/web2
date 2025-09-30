package com.web2.manutencaoBackend.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.web2.manutencaoBackend.entity.Funcionario;
import com.web2.manutencaoBackend.entity.UserRole; // ✅ certo
import com.web2.manutencaoBackend.repository.FuncionarioRepository;


import jakarta.transaction.Transactional;

@Transactional
@Service
public class FuncionarioService {

    private final FuncionarioRepository funcionarioRepository;
    private final PasswordEncoder passwordEncoder;

    public FuncionarioService(FuncionarioRepository funcionarioRepository, PasswordEncoder passwordEncoder) {
        this.funcionarioRepository = funcionarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // Retorna todos os funcionários ativos
    public List<Funcionario> getAllActive() {
        return funcionarioRepository.findAllByAtivoTrue(); // 🔹 corrigido
    }

    // Salva um novo funcionário (com criptografia de senha)
    public Funcionario save(Funcionario funcionario) {
        funcionario.setRole(UserRole.FUNCIONARIO); // 🔹 exige atributo role em Funcionario
        funcionario.setSenha(passwordEncoder.encode(funcionario.getSenha())); // 🔹 exige atributo senha
        funcionario.setDataRegistro(LocalDateTime.now()); // 🔹 exige atributo dataRegistro
        funcionario.setAtivo(true); // 🔹 exige atributo ativo
        return funcionarioRepository.save(funcionario);
    }

    // Desativa o funcionário (remoção lógica - RF não-funcional)
    public void delete(Long id) {
        Funcionario f = funcionarioRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Funcionario não encontrado"));

        if (funcionarioRepository.findAllByAtivoTrue().size() <= 1) { // 🔹 corrigido
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Não é possível remover o único funcionário ativo.");
        }

        f.setAtivo(false);
        funcionarioRepository.save(f);
    }
    public List<Funcionario> getAll() {
        return funcionarioRepository.findAll();
}

    // Atualiza dados do funcionário
    public Funcionario update(Long id, Funcionario funcionario) {
        Funcionario f = funcionarioRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Funcionario não encontrado"));

        f.setEmail(funcionario.getEmail());
        f.setNome(funcionario.getNome());
        f.setDataNascimento(funcionario.getDataNascimento());

        if (funcionario.getSenha() != null && !funcionario.getSenha().isEmpty()) {
            f.setSenha(passwordEncoder.encode(funcionario.getSenha()));
        }

        return funcionarioRepository.save(f);
    }

    // Busca funcionário por email (usado para validação e login)
    public Optional<Funcionario> findByEmail(String email) {
        return funcionarioRepository.findByEmail(email);
    }
}
