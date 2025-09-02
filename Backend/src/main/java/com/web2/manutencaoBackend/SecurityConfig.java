package com.web2.manutencaoBackend;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public static PasswordEncoder passwordEncoder(){
        int tempo = 12;
        return new BCryptPasswordEncoder(tempo);
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            // desabilita CSRF para facilitar uso em APIs REST
            .csrf(csrf -> csrf.disable())
            // autorizações
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/clientes/autocadastro").permitAll() // autocadastro sem login
                .anyRequest().authenticated() // o resto exige login
            )
            // autenticação Basic no padrão novo
            .httpBasic(Customizer.withDefaults());

        return http.build();
    }
}
