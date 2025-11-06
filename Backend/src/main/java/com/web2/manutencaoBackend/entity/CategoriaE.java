package com.web2.manutencaoBackend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class CategoriaE {
	 @Id
	 @GeneratedValue(strategy=GenerationType.IDENTITY)
	 private Long id;
	 private String nome;
	 private Boolean ativo = true;
	 
	 public CategoriaE() {
		 
	 }
	 
	 public CategoriaE(long id, String nome) {
		 this.id = id;
		 this.nome = nome;
		 this.ativo = true;
	 }

	 public void setId(Long id) {
		 this.id = id;
	 }
	 
	 public Long getId() {
		 return this.id;
	 }
	 
	 public void setNome(String nome) {
		 this.nome = nome;
	 }
	 
	 public String getNome() {
		 return this.nome;
	 }

	public void setAtivo(Boolean ativo){
		this.ativo = ativo;
	}
}
