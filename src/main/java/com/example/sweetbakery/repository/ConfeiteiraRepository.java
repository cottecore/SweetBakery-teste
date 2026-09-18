package com.example.sweetbakery.repository;

import com.example.sweetbakery.entidades.Confeiteira;
import com.example.sweetbakery.entidades.EnumStatusUsuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ConfeiteiraRepository extends JpaRepository<Confeiteira,Long> {

    boolean existsUsuarioByEmailAndSenha(String email, String senha);

    Optional<List<Confeiteira>> findByStatusNot(EnumStatusUsuario status);
}
