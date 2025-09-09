package com.web2.manutencaoBackend.service;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public static void enviarSenha(String para, String senha) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(para);
        message.setSubject("Sua senha de acesso");
        message.setText("Olá!\n\nSua senha é: " + senha);
        mailSender.send(message);
    }
}
