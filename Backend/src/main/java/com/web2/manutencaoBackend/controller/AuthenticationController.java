package com.web2.manutencaoBackend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

//import com.web2.manutencaoBackend.repository.UserRepository;

@RestController
@RequestMapping("/auth")   
public class AuthenticationController {
    
  @Autowired
  private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

  @Autowired
  private UserRepository repository;

    @PostMapping("/login")
        public ResponseEntity<String> login(@RequestBody AuthenticationDTO request) {
        Authentication auth = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(request.getLogin(), request.getSenha())
        );
        return ResponseEntity.ok().build();
    }
   
    @PostMapping("/register")
    public ResponseEntity register(@RequestBody @Valid RegisterDTO data){
        if(this.repository.findByLogin(data.login()) != null) return ResponseEntity.badRequest().build();
        
        String encryptedPassword = passwordEncoder.encode(data.senha());
        User newUser = new User(data.login(), encryptedPassword, data.role());

        this.repository.save(newUser);

        return ResponseEntity.ok().build();
        
    }
}