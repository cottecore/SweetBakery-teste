package com.example.sweetbakery.controllers;

import com.example.sweetbakery.dtos.AtualizarStatusRequest;
import com.example.sweetbakery.entidades.Confeiteira;
import com.example.sweetbakery.entidades.EnumStatusUsuario;
import com.example.sweetbakery.repository.ConfeiteiraRepository;
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
    private ConfeiteiraRepository confeiteiraRepository;

    @GetMapping
    @Operation(summary = "Metodo de consulta de lista de usuarios!", description = "metodo para reponsavel em efetuar consulta de usuarios sem filtro")
    public ResponseEntity<?> listarTodos(){

        return  ResponseEntity.ok(confeiteiraRepository.findAll());
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Metodo de criação d de usuarios!", description = "metodo para reponsavel em criar novos usuarios")

    public ResponseEntity<Confeiteira> criar(@RequestBody Confeiteira confeiteira){

        var confeiteiraBanco = confeiteiraRepository.save(confeiteira);
        return ResponseEntity.ok(confeiteiraBanco);

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
