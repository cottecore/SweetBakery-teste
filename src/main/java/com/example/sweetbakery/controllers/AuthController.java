package com.example.sweetbakery.controllers;

import com.example.sweetbakery.dtos.LoginRequest;
import com.example.sweetbakery.dtos.LoginResponse;
import com.example.sweetbakery.repository.ConfeiteiraRepository;
import com.example.sweetbakery.services.TokenService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.HttpURLConnection;

@RestController
@RequestMapping("/auth")
@Tag(description = "teste", name = "teste")
public class AuthController {

    @Autowired
    private TokenService tokenService;

    @Autowired
    private ConfeiteiraRepository confeiteiraRepository;

    @Autowired
    private ConfeiteiraRepository clienteRepository;

    @PostMapping("/login")
    @Operation(summary = "Login", description = "Método responsavel por efetuar o login do usuário!")
    public ResponseEntity<?> login(@RequestBody LoginRequest resquest) {



        if (confeiteiraRepository.existsUsuarioByEmailAndSenha(resquest.email(), resquest.senha())) {

            var token = tokenService.gerarToken(resquest);

            return ResponseEntity.ok(new LoginResponse(token));
        } else if (clienteRepository.existsUsuarioByEmailAndSenha(resquest.email(), resquest.senha())) {
            var token = tokenService.gerarToken(resquest);

            return ResponseEntity.ok(new LoginResponse(token));
        }

        return ResponseEntity.badRequest().body("Usuário ou senha Invalido!");

    }
}

