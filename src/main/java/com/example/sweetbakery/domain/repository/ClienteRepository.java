package com.example.sweetbakery.domain.repository;

import com.example.sweetbakery.domain.entidades.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClienteRepository extends JpaRepository<Cliente,Long> {
}
