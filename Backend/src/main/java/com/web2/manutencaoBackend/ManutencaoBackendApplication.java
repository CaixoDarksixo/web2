package com.web2.manutencaoBackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ManutencaoBackendApplication {

	public static void main(String[] args) {
		//PasswordEncoder encoder = new BCryptPasswordEncoder();
        //System.out.println(encoder.encode("1234"));
		SpringApplication.run(ManutencaoBackendApplication.class, args);
	}

}
