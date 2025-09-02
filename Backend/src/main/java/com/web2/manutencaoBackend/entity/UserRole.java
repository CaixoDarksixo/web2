package com.web2.manutencaoBackend.entity;

public enum UserRole {
    ADMIN(  "admin"),
    FUNCIONARIO("funcionario"),
    CLIENTE("cliente");   

    private final String role;

    UserRole(String role) {
        this.role = role;
    }
    public String getRole() {
        return role;
    }
}