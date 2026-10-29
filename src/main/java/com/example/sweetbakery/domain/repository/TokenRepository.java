package com.example.sweetbakery.domain.repository;

import ch.qos.logback.core.subst.Token;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository

public interface TokenRepository extends JpaRepository<Token,Long> {


    Optional<Token> findTokenByToken(String token);
}
