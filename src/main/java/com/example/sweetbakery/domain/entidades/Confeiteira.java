package com.example.sweetbakery.domain.entidades;

import com.example.sweetbakery.application.dtos.CriarAdminRequest;
import com.example.sweetbakery.application.dtos.UsuarioRequest;
import com.example.sweetbakery.domain.valueobject.CPF;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.jspecify.annotations.Nullable;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Confeiteira  implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Long id;

    private String nome;

    @EmbeddedId
    private CPF cpf;

    private String senha;

    private String email;

    private String role = "ROLE_USER";

    //mudar conforme tema/verificar com o sor se esta certo

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "empresa_id",referencedColumnName = "id")
    private Empresa empresa;

    @ManyToMany
    @JoinTable(
            name = "tb_confeiteiras",
            joinColumns = @JoinColumn(name = "usuario_id"),
            inverseJoinColumns = @JoinColumn(name = "cargo_id")
    )
    private Set<Cargo> cargo = new HashSet<>();

    public void matricular(Cargo cargo){
        this.cargo.add(cargo);
    }

    private EnumStatusUsuario status = EnumStatusUsuario.ATIVO;


    public void setEmail(String email) {
        if(!email.isEmpty() && !email.contains("@")){
            throw new IllegalArgumentException("Email Invalido!");
        }
        this.email = email;
    }

    public Confeiteira(CriarAdminRequest criarAdminRequest) {
        this.setCpf(new CPF(criarAdminRequest.cpf()));
        this.setNome(criarAdminRequest.nome());
        this.setSenha(criarAdminRequest.senha());
        this.setEmail(criarAdminRequest.email());
        this.setRole("ROLE_ADMIN");

    }

    public Confeiteira(UsuarioRequest usuario) {
        this.setCpf(new CPF(usuario.cpf()));
        this.setNome(usuario.nome());
        this.setSenha(usuario.senha());
        this.setEmail(usuario.email());
        this.setRole("ROLE_USER");
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of();
    }

    @Override
    public @Nullable String getPassword() {
        return "";
    }

    @Override
    public String getUsername() {
        return "";
    }
}
