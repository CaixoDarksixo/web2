package com.web2.manutencaoBackend.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.web2.manutencaoBackend.dto.FuncionarioRequestDTO;
import com.web2.manutencaoBackend.dto.FuncionarioResponseDTO;
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

    public List<FuncionarioResponseDTO> getAll() {
        return funcionarioRepository.findAll().stream()
                .map(this::convertToResponse)
                .toList();
    }

    public List<FuncionarioResponseDTO> getAllActive() {
        return funcionarioRepository.findAllByAtivoTrue().stream()
                .map(this::convertToResponse)
                .toList();
    }

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

    public FuncionarioResponseDTO save(FuncionarioRequestDTO dto) {
        Funcionario funcionario = convertToEntity(dto);
        
        funcionario.setRole(UserRole.FUNCIONARIO);
        
        if (dto.getPassword() != null && !dto.getPassword().isEmpty()) {
            funcionario.setPassword(passwordEncoder.encode(dto.getPassword()));
        }
        
        funcionario.setDataRegistro(LocalDateTime.now());
        funcionario.setAtivo(true);
        Funcionario savedFuncionario = funcionarioRepository.save(funcionario);
        return convertToResponse(savedFuncionario);
    }

    public FuncionarioResponseDTO update(Long id, FuncionarioRequestDTO dto) {
        Funcionario existente = funcionarioRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Funcionário não encontrado"));
        
        existente.setNome(dto.getNome());
        existente.setEmail(dto.getEmail());
        
        if (dto.getPassword() != null && !dto.getPassword().isEmpty()) {
            existente.setPassword(passwordEncoder.encode(dto.getPassword()));
        }
        
        Funcionario updatedFuncionario = funcionarioRepository.save(existente);
        return convertToResponse(updatedFuncionario);
    }

    public boolean delete(Long id) {
        Funcionario funcionario = funcionarioRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Funcionário não encontrado"));
        funcionario.setAtivo(false);
        funcionarioRepository.save(funcionario);
        return true;
    }
    
    private Funcionario convertToEntity(FuncionarioRequestDTO dto) {
        Funcionario entity = new Funcionario();
        entity.setNome(dto.getNome());
        entity.setEmail(dto.getEmail());
        entity.setPassword(dto.getPassword());
        return entity;
    }

    private FuncionarioResponseDTO convertToResponse(Funcionario entity) {
        return new FuncionarioResponseDTO(
            entity.getId(), 
            entity.getNome(), 
            entity.getEmail(), 
            entity.getDataRegistro(), 
            entity.isAtivo()
        );
    }
}