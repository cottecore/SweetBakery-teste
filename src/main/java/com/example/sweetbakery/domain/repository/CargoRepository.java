package com.example.sweetbakery.domain.repository;

import com.example.sweetbakery.domain.entidades.Cargo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CargoRepository extends JpaRepository<Cargo,Long> {
}
