package com.example.sweetbakery.domain.entidades;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "token")
public class Token {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String token;

    private LocalDateTime dataCadastro;

    @ManyToOne
    @JoinColumn(name = "usuario_id", referencedColumnName = "id")
    private Confeiteira confeiteira;

    public Token(String token, Confeiteira confeiteira) {

        this.setToken(token);
        this.setConfeiteira(confeiteira);
        this.setDataCadastro(LocalDateTime.now());
    }
}
