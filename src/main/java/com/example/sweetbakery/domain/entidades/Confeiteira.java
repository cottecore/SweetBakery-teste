package com.example.sweetbakery.domain.entidades;

import com.example.sweetbakery.domain.valueobject.CPF;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Confeiteira {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    @EmbeddedId
    private CPF cpf;

    private String senha;

    private String email;

    private EnumStatusUsuario status;
}
