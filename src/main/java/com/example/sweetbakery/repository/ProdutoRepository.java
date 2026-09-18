package com.example.sweetbakery.repository;

import com.example.sweetbakery.entidades.Produto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProdutoRepository extends JpaRepository<Produto,Long> {
}
