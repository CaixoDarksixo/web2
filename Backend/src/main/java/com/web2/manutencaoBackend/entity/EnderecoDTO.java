package com.web2.manutencaoBackend.entity;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EnderecoDTO {

    private String logradouro; 
    

    private String localidade; 
    

    private String uf; 
    
   
    private String cep; 
}
