package com.example.sweetbakery.application.dtos;

import com.example.sweetbakery.domain.entidades.Confeiteira;
import com.example.sweetbakery.domain.valueobject.CPF;

public record UsuarioLogado(Long id, String email, CPF cpf,
                            Long empresa_id,
                            java.util.Collection<? extends org.springframework.security.core.GrantedAuthority> authorities) {

    public UsuarioLogado(Confeiteira usuario){
        this(
                usuario.getId(),
                usuario.getEmail(),
                usuario.getCpf(),
                usuario.getEmpresa()!=null? usuario.getEmpresa().getId(): null,
                usuario.getAuthorities()
        );
    }
}
