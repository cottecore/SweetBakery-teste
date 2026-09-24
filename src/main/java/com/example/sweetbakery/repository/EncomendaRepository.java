package com.example.sweetbakery.repository;

import com.example.sweetbakery.entidades.Encomenda;
import com.example.sweetbakery.entidades.EnumStatusEncomenda;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface EncomendaRepository extends JpaRepository<Encomenda,Long> {

    boolean existsEncomendaById(String id);

    Optional<List<Encomenda>> findByStatusEncomendaNot(EnumStatusEncomenda statusEncomenda);

}
