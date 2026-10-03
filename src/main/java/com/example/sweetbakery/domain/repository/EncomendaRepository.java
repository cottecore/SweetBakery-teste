package com.example.sweetbakery.domain.repository;

import com.example.sweetbakery.domain.entidades.Encomenda;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EncomendaRepository
        extends JpaRepository<Encomenda, Long> {
}