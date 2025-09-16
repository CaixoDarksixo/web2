package com.web2.manutencaoBackend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.web2.manutencaoBackend.entity.CategoriaE;
import com.web2.manutencaoBackend.repository.CategoriaERepository;

@Service
public class CategoriaService {

    private final CategoriaERepository categoriaERepository;

    @Autowired
    public CategoriaService(CategoriaERepository categoriaERepository) {
        this.categoriaERepository = categoriaERepository;
    }

    public List<CategoriaE> getAll() {
        return categoriaERepository.findAll();
    }

    public Optional<CategoriaE> findById(Long id) {
        return categoriaERepository.findById(id);
    }

    public CategoriaE save(CategoriaE categoria) {
        // Lógica de validação pode ser adicionada aqui, se necessário.
        return categoriaERepository.save(categoria);
    }

    public CategoriaE update(Long id, CategoriaE categoria) {
        if (categoriaERepository.existsById(id)) {
            categoria.setId(id);
            return categoriaERepository.save(categoria);
        }
        throw new IllegalArgumentException("Categoria não encontrada para o ID: " + id);
    }

    public void delete(Long id) {
        if (categoriaERepository.existsById(id)) {
            categoriaERepository.deleteById(id);
        } else {
            throw new IllegalArgumentException("Categoria não encontrada para o ID: " + id);
        }
    }
}
