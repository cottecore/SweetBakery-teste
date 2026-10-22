package com.example.sweetbakery.presentation;

import com.example.sweetbakery.application.dtos.CriarAdminRequest;
import com.example.sweetbakery.application.dtos.CriarAdminResponse;
import com.example.sweetbakery.application.dtos.UsuarioRequest;
import com.example.sweetbakery.application.dtos.UsuarioResponse;
import com.example.sweetbakery.application.services.UsuarioService;
import com.example.sweetbakery.domain.entidades.Confeiteira;
import com.example.sweetbakery.domain.entidades.EnumStatusUsuario;
import com.example.sweetbakery.domain.repository.ConfeiteiraRepository;
import com.example.sweetbakery.dtos.AtualizarStatusRequest;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/usuarios")
@Tag(name = "usuarios", description = "testeteste")
public class ConfeiteiraController {

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private ConfeiteiraRepository confeiteiraRepository;


    @PostMapping("/admin")
    public ResponseEntity<CriarAdminResponse> criarAdmin(@RequestBody CriarAdminRequest criarAdminRequest){

        try{
            CriarAdminResponse respostaSalvar = usuarioService.criarAdmin(criarAdminRequest);
            return ResponseEntity.ok(respostaSalvar);

        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }

    }

    @GetMapping("/{id}")
    public ResponseEntity<UsuarioResponse> buscarPorId(@PathVariable Long id){

        UsuarioResponse usuarioBanco = usuarioService.buscarPorId(id);
        if(usuarioBanco!= null ){
            return  ResponseEntity.ok(usuarioBanco);
        }

        return  ResponseEntity.notFound().build();
    }


    @GetMapping
    @Operation(summary = "Metodo de consulta de lista de usuarios!", description = "metodo para reponsavel em efetuar consulta de usuarios sem filtro")
    public ResponseEntity<?> listarTodos(){

        return  ResponseEntity.ok(confeiteiraRepository.findAll());
    }

    //mudar usando o do sor
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<?> criar(@RequestBody UsuarioRequest usuario){

        try {
            UsuarioResponse usuarioBanco = usuarioService.salvarUsuario(usuario,0L);
            return ResponseEntity.ok(usuarioBanco);
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<Void> atualizarStatus(@PathVariable Long id, @RequestBody AtualizarStatusRequest statusRequest) {

        Confeiteira confeiteiraBanco = confeiteiraRepository.findById(id).orElse(null);
        if (confeiteiraBanco != null) {
            confeiteiraBanco.setStatus(statusRequest.status());
            confeiteiraRepository.save(confeiteiraBanco);
            return ResponseEntity.ok().build();
        }

        return ResponseEntity.notFound().build();

    }

    @PutMapping("/{id}")
    public ResponseEntity<Confeiteira> atualizar(@PathVariable Long id, @RequestBody Confeiteira confeiteira){

        try{
            Confeiteira confeiteiraBanco = confeiteiraRepository.findById(id).orElse(null);
            if(confeiteiraBanco!= null ){
                confeiteiraBanco.setStatus(confeiteira.getStatus());
                confeiteiraBanco.setNome(confeiteira.getNome());
                confeiteiraBanco.setCpf(confeiteira.getCpf());
                confeiteiraBanco.setEmail(confeiteira.getEmail());
                confeiteiraBanco.setSenha(confeiteira.getSenha());
                confeiteiraRepository.save(confeiteiraBanco);
                return  ResponseEntity.ok().build();
            }

            return  ResponseEntity.notFound().build();
        } catch (RuntimeException e) {
            throw new RuntimeException(e);
        }


    }

    @DeleteMapping("/{id}/excluir")
    public ResponseEntity<Void> excluir(@PathVariable Long id){

        Confeiteira confeiteiraBanco = confeiteiraRepository.findById(id).orElse(null);
        if(confeiteiraBanco!= null ){
            confeiteiraBanco.setStatus(EnumStatusUsuario.EXCLUIDO);
            confeiteiraRepository.save(confeiteiraBanco);
            return  ResponseEntity.ok().build();
        }

        return  ResponseEntity.notFound().build();
    }


}
