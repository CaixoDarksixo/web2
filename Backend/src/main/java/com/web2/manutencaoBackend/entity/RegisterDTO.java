package com.web2.manutencaoBackend.entity;

public record RegisterDTO(String login, String password, UserRole role) {
}