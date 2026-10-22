package com.example.sweetbakery.application.dtos;

public record CriarAdminRequest(String nome, String email, String senha, String cpf, String secretKey) {
}
