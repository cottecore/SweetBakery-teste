package com.example.sweetbakery.repository;

import com.example.sweetbakery.entidades.Cliente;
import com.example.sweetbakery.entidades.Confeiteira;
import com.example.sweetbakery.entidades.EnumStatusUsuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ClienteRepository extends JpaRepository<Cliente,Long> {
    boolean existsUsuarioByEmailAndSenha(String email, String senha);

    Optional<List<Cliente>> findByStatusNot(EnumStatusUsuario status);
}
