package com.web2.manutencaoBackend.entity;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.DiscriminatorColumn;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.Table;

@Entity
@Table(name = "users")
@Inheritance(strategy= InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "user_type")
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String login;
    private String password;
    private UserRole role;
    private boolean ativo;
    @CreationTimestamp
    private LocalDateTime dataRegistro;

    public User() {
    }

    public User(String login, String senha, UserRole role, LocalDateTime data) {
        this.login = login;
        this.password = senha;
        this.role = role;
        this.ativo = true;
        this.dataRegistro = data;
    }

    @Override
    public String getUsername() {
        return login;
    }

    @Override
    public String getPassword() {
        return password;
    }

    public void setRole(UserRole role){
        this.role = role;
    }

    public UserRole getRole() {
        return this.role;
    }

    public LocalDateTime getDataRegistro(){
        return this.dataRegistro;
    }

    public void setDataRegistro(LocalDateTime data){
        this.dataRegistro = data;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public boolean getAtivo(){
        return ativo;
    }

    public void setAtivo(boolean ativo){
        this.ativo = ativo;
    }

    public void setLogin(String login){
        this.login = login;
    }

    @Override
    public java.util.Collection<? extends org.springframework.security.core.GrantedAuthority> getAuthorities() {
        if (this.role == UserRole.ADMIN) {
            return java.util.List.of(
                new org.springframework.security.core.authority.SimpleGrantedAuthority("ROLE_ADMIN"),
                new org.springframework.security.core.authority.SimpleGrantedAuthority("ROLE_CLIENTE"),
                new org.springframework.security.core.authority.SimpleGrantedAuthority("ROLE_FUNCIONARIO")
            );
        } else if (this.role == UserRole.FUNCIONARIO) {
            return java.util.List.of(
                new org.springframework.security.core.authority.SimpleGrantedAuthority("ROLE_FUNCIONARIO"),
                new org.springframework.security.core.authority.SimpleGrantedAuthority("ROLE_CLIENTE")
            );
        }
            else {
                return java.util.List.of(
                new org.springframework.security.core.authority.SimpleGrantedAuthority("ROLE_CLIENTE")
            );
            }
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        if (this.getAtivo() == false) { return false; }
        else {
        return true; }
    }
}
