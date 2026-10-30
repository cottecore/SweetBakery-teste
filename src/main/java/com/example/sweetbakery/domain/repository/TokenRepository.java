package com.example.sweetbakery.domain.repository;

import com.example.sweetbakery.domain.entidades.Token;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository

public interface TokenRepository extends JpaRepository<Token,Long> {


    Optional<Token> findTokenByToken(String token);
}
