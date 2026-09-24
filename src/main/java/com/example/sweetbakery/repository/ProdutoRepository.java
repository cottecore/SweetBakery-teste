package com.example.sweetbakery.repository;

import com.example.sweetbakery.entidades.Confeiteira;
import com.example.sweetbakery.entidades.EnumStatusProduto;
import com.example.sweetbakery.entidades.EnumStatusUsuario;
import com.example.sweetbakery.entidades.Produto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProdutoRepository extends JpaRepository<Produto,Long> {
    boolean existsProdutoById(String id);
    Optional<List<Produto>> findByStatusProdutoNot(EnumStatusProduto statusProduto);
}
