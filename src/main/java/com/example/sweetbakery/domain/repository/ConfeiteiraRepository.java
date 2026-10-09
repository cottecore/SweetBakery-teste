package com.example.sweetbakery.domain.repository;

import com.example.sweetbakery.domain.entidades.Confeiteira;
import com.example.sweetbakery.domain.entidades.EnumStatusUsuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ConfeiteiraRepository extends JpaRepository<Confeiteira,Long> {



    boolean existsUsuarioByEmailAndSenha(String email, String senha);

    Optional<List<Confeiteira>> findByStatusNot(EnumStatusUsuario status);
}
