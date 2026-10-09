package com.example.sweetbakery.application.services;

import com.example.sweetbakery.application.dtos.LoginRequest;
import com.example.sweetbakery.application.dtos.LoginResponse;
import com.example.sweetbakery.application.dtos.UsuarioResponse;
import com.example.sweetbakery.domain.entidades.Confeiteira;
import com.example.sweetbakery.domain.repository.ConfeiteiraRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsuarioService {

    @Autowired
    private ConfeiteiraRepository confeiteiraRepository;

    @Autowired
    private TokenService tokenService;

    public LoginResponse validarUsuarioAutenticadoRetornaToken(LoginRequest resquest) {

        if (confeiteiraRepository.existsUsuarioByEmailAndSenha(resquest.email(), resquest.senha())) {

            var token = tokenService.gerarToken(resquest);
            return new LoginResponse(token);
        }
        return null;
    }


    public List<UsuarioResponse> listarTodosUsuariosTable(){

        return  confeiteiraRepository.findAll()
                .stream()
                .map(UsuarioResponse::new)
                .toList();
    }





}
