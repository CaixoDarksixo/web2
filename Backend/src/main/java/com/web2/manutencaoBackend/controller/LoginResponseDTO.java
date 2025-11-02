package com.web2.manutencaoBackend.controller;

import java.util.List;


public record LoginResponseDTO(String token, List<String> role){

}
