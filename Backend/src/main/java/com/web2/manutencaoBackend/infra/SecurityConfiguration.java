package com.web2.manutencaoBackend.infra;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {

    @Autowired
    SecurityFilter securityFilter;


    
    @Bean
    public static PasswordEncoder passwordEncoder() {

        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
            .csrf(csrf -> csrf.disable())
            .sessionManagement(session ->
                session.sessionCreationPolicy(org.springframework.security.config.http.SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/auth/**").permitAll() // autenticação aberta
                .requestMatchers("/auth/login").permitAll()
                .requestMatchers("/auth/me").authenticated()
                .requestMatchers("/api/clientes/autocadastro").permitAll() // autocadastro sem login
                .requestMatchers("/servicos/**").hasAnyRole("CLIENTE", "ADMIN") // controle por role
                .requestMatchers("/servicos").hasAnyRole("CLIENTE", "ADMIN")
                .requestMatchers("/api/clientes").hasRole("ADMIN") // só admin
                .requestMatchers("/funcionarios/**").hasAnyRole("FUNCIONARIO", "ADMIN")
                .anyRequest().authenticated() // todo o resto precisa de login
            //      .anyRequest().permitAll() //ative pra testar
            )
            // autenticação Basic no padrão novo
            .addFilterBefore(securityFilter, UsernamePasswordAuthenticationFilter.class)
            .httpBasic(Customizer.withDefaults())
            .build();
    }

}
