package com.example.sweetbakery.application.services;

import com.example.sweetbakery.application.dtos.*;
import com.example.sweetbakery.domain.entidades.Cargo;
import com.example.sweetbakery.domain.entidades.Confeiteira;
import com.example.sweetbakery.domain.repository.CargoRepository;
import com.example.sweetbakery.domain.repository.ConfeiteiraRepository;
import com.example.sweetbakery.domain.valueobject.CPF;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import com.example.sweetbakery.domain.entidades.EnumStatusUsuario;

import java.util.List;

@Service
public class UsuarioService {

    @Autowired
    private ConfeiteiraRepository confeiteiraRepository;

    @Autowired
    private CargoRepository cargoRepository;


    @Autowired
    private TokenService tokenService;

    @Value("${spring.secretkey}")
    private String secret;

    public LoginResponse validarUsuarioAutenticadoRetornaToken(LoginRequest resquest) {

        if (confeiteiraRepository.existsUsuarioByEmailAndSenha(resquest.email(), resquest.senha())) {

            var token = tokenService.gerarToken(resquest);
            return new LoginResponse(token);
        }
        return null;
    }


    public List<UsuarioResponse> listarTodosUsuariosTable(){

        return  confeiteiraRepository.findAll()
                .stream()
                .map(UsuarioResponse::new)
                .toList();
    }


    public CriarAdminResponse criarAdmin(CriarAdminRequest criarAdminRequest) {

        if(!criarAdminRequest.secretKey().equals(secret)){
            return new CriarAdminResponse(0L,"Usuario Salvo com sucesso!");

        }

        Confeiteira usuarioAdminSalvar = new Confeiteira(criarAdminRequest);
        confeiteiraRepository.save(usuarioAdminSalvar);

        return new CriarAdminResponse(usuarioAdminSalvar.getId(),"Usuario Salvo com sucesso!");
    }

    public UsuarioResponse salvarUsuario(UsuarioRequest usuario, Long id) {

        //Novo Usuario
        if(id == 0L) {
            Confeiteira usuarioBanco = new Confeiteira(usuario);
            confeiteiraRepository.save(usuarioBanco);

            return new UsuarioResponse(usuarioBanco);
        }else {
            //Usuario existente
            Confeiteira usuarioBanco = confeiteiraRepository.findById(id).orElse(null);
            if(usuarioBanco!= null ){
                usuarioBanco.setNome(usuario.nome());
                usuarioBanco.setCpf(new CPF(usuario.cpf()));
                usuarioBanco.setEmail(usuario.email());
                usuarioBanco.setSenha(usuario.senha());
                confeiteiraRepository.save(usuarioBanco);
                return  new UsuarioResponse(usuarioBanco);
            }

        }

        return null;
    }

    public UsuarioResponse buscarPorId(Long id) {

        var usuario = confeiteiraRepository.findById(id).orElse(null);
        if(usuario == null){
            return null;
        }

        return new UsuarioResponse(usuario);


    }

    public boolean atualizarStatus(EnumStatusUsuario status,Long id) {

        Confeiteira usuarioBanco = confeiteiraRepository.findById(id).orElse(null);
        if(usuarioBanco!= null ){
            usuarioBanco.setStatus(status);
            confeiteiraRepository.save(usuarioBanco);
            return  true;
        }
        return false;

    }


    public boolean CadastrarConfeiteiraTabela(Long id, ConfeiteiraTabelaRequest confeiteiraTabelaRequest) {

        Confeiteira usuarioBanco = confeiteiraRepository.findById(id).orElse(null);
        Cargo cargoBanco = cargoRepository.findById(confeiteiraTabelaRequest.cargo_id()).orElse(null);
        if(usuarioBanco!= null && cargoBanco!= null) {

            var curso =  usuarioBanco.getCargo().stream()
                    .anyMatch(u->u.getId().equals(cargoBanco.getId()));

            if(curso){
                return true;
            }else {
                usuarioBanco.getCargo().add(cargoBanco);

                confeiteiraRepository.save(usuarioBanco);


                return true;
            }

        }
        return false;

    }

}
