package com.example.sweetbakery.application.dtos;

public record UsuarioRequest(String nome, String email, String senha, String cpf, String secretKey) {
}
