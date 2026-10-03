package com.example.sweetbakery.domain.repository;
import com.example.sweetbakery.domain.entidades.EnumStatusProduto;
import com.example.sweetbakery.domain.entidades.Produto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProdutoRepository extends JpaRepository<Produto,Long> {
    boolean existsProdutoById(String id);
    Optional<List<Produto>> findByStatusProdutoNot(EnumStatusProduto statusProduto);
}
