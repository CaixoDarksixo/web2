package com.web2.manutencaoBackend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

@Component
public class MailService {

    @Autowired
    private JavaMailSender enviaEmail;

    public void enviarSenha(
      String para, String senha) {
        SimpleMailMessage message = new SimpleMailMessage(); 
        message.setFrom("noreply@baeldung.com");
        message.setTo(para); 
        message.setSubject("Sua senha de acesso"); 
        message.setText("Olá!\n\nA sua senha de acesso é " + senha);
        enviaEmail.send(message);
    }
}