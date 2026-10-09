package com.example.sweetbakery.application.dtos;

import com.example.sweetbakery.domain.entidades.Confeiteira;
import com.example.sweetbakery.domain.entidades.EnumStatusUsuario;

public record UsuarioResponse(Long id, String nome, String cpf, String email, EnumStatusUsuario status) {

    public UsuarioResponse(Confeiteira usuarioEntidade){

        this(
                usuarioEntidade.getId(),
                usuarioEntidade.getNome(),
                usuarioEntidade.getCpf(),
                usuarioEntidade.getEmail(),
                usuarioEntidade.getStatus()
        );
    }
}
