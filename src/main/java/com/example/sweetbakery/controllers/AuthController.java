        package com.example.sweetbakery.controllers;

import com.example.sweetbakery.dtos.LoginRequest;
import com.example.sweetbakery.dtos.LoginResponse;
import com.example.sweetbakery.repository.ConfeiteiraRepository;
import com.example.sweetbakery.services.TokenService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@Tag(description = "teste", name = "teste")
public class AuthController {

    @Autowired
    private TokenService tokenService;

    @Autowired
    private ConfeiteiraRepository confeiteiraRepository;

    @PostMapping("/login")
    @Operation(
            summary = "Login",
            description = "Método responsável por efetuar o login da confeiteira!"
    )
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {

        if (confeiteiraRepository.existsUsuarioByEmailAndSenha(
                request.email(),
                request.senha()
        )) {

            var token = tokenService.gerarToken(request);

            return ResponseEntity.ok(new LoginResponse(token));
        }

        return ResponseEntity
                .badRequest()
                .body("Usuário ou senha inválido!");
    }
}

