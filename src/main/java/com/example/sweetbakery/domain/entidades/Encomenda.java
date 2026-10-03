package com.example.sweetbakery.domain.entidades;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Encomenda {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate dataPedido;

    private LocalDate prazo;

    private String classificacao;

    @Enumerated(EnumType.STRING)
    private EnumStatusEncomenda statusEncomenda;
}