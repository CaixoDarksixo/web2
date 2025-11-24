package com.web2.manutencaoBackend.service;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
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
    private final PasswordEncoder passwordEncoder;

    public FuncionarioService(FuncionarioRepository funcionarioRepository, PasswordEncoder passwordEncoder) {
        this.funcionarioRepository = funcionarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

  /*  public List<FuncionarioResponseDTO> getAll() {
        return funcionarioRepository.findAll().stream()
                .map(this::convertToResponse)
                .toList();
    } */

  /*  public List<FuncionarioResponseDTO> getAllActive() {
        return funcionarioRepository.findAllByAtivoTrue().stream()
                .map(this::convertToResponse)
                .toList();
    } */

    public Optional<Funcionario> findById(Long id) {
        return funcionarioRepository.findById(id);
    }

    /*
    public FuncionarioResponseDTO findById(Long id) {
        Funcionario funcionario = funcionarioRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Funcionário não encontrado"));
        return funcionario);
    }

     */

    public Optional<Funcionario> findByEmail(String email) {
        return funcionarioRepository.findByEmail(email);
    }

    public Funcionario save(Funcionario funcionario) {
        
        funcionario.setRole(UserRole.FUNCIONARIO);
        
        if (funcionario.getPassword() != null && !funcionario.getPassword().isEmpty()) {
            funcionario.setPassword(passwordEncoder.encode(funcionario.getPassword()));
        }
        funcionario.setLogin(funcionario.getEmail());
        funcionario.setDataRegistro(LocalDateTime.now());
        funcionario.setAtivo(true);
        return funcionarioRepository.save(funcionario);
    }

    public Funcionario update(Long id, Funcionario funcionario) {
        Funcionario existente = funcionarioRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Funcionário não encontrado"));
        
        existente.setNome(funcionario.getNome());
        existente.setEmail(funcionario.getEmail());
        
        if (funcionario.getPassword() != null && !funcionario.getPassword().isEmpty()) {
            existente.setPassword(passwordEncoder.encode(funcionario.getPassword()));
        }
        
        return funcionarioRepository.save(existente);
    }

    public boolean delete(Long id) {
        Funcionario funcionario = funcionarioRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Funcionário não encontrado"));
        funcionario.setAtivo(false);
        funcionarioRepository.save(funcionario);
        return true;
    }
    
   /* private Funcionario convertToEntity(FuncionarioRequestDTO dto) {
        Funcionario entity = new Funcionario();
        entity.setNome(dto.getNome());
        entity.setEmail(dto.getEmail());
        entity.setPassword(dto.getPassword());
        return entity;
    } */

 /*   private FuncionarioResponseDTO convertToResponse(Funcionario entity) {
        return new FuncionarioResponseDTO(
            entity.getId(), 
            entity.getNome(), 
            entity.getEmail(), 
            entity.getDataRegistro(), 
           // entity.isAtivo()
        );
    } */
}