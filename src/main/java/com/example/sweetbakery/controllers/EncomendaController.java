package com.example.sweetbakery.controllers;

import com.example.sweetbakery.dtos.AtualizarStatusRequest;
import com.example.sweetbakery.entidades.Encomenda;
import com.example.sweetbakery.entidades.EnumStatusEncomenda;
import com.example.sweetbakery.entidades.EnumStatusUsuario;
import com.example.sweetbakery.repository.EncomendaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/encomenda")
public class EncomendaController {

    @Autowired
    private EncomendaRepository encomendaRepository;

    @GetMapping
    public ResponseEntity<?> listarTodos(){

        return  ResponseEntity.ok(encomendaRepository.findAll());
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<Encomenda> criar(@RequestBody Encomenda encomenda){

        var encomendaBanco = encomendaRepository.save(encomenda);
        return ResponseEntity.ok(encomendaBanco);

    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<Void> atualizarStatus(@PathVariable Long id, @RequestBody AtualizarStatusRequest statusRequest) {

        Encomenda encomendaBanco = encomendaRepository.findById(id).orElse(null);
        if (encomendaBanco != null) {
            encomendaBanco.setStatusEncomenda(statusRequest.statusEncomenda());
            encomendaRepository.save(encomendaBanco);
            return ResponseEntity.ok().build();
        }

        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Encomenda> atualizar(@PathVariable Long id, @RequestBody Encomenda encomenda){

        try{
            Encomenda encomendaBanco = encomendaRepository.findById(id).orElse(null);
            if(encomendaBanco!= null ){
                encomendaBanco.setStatusEncomenda(encomenda.getStatusEncomenda());
                encomendaBanco.setId(encomenda.getId());
                encomendaBanco.setPrazo(encomenda.getPrazo());
                encomendaBanco.setClassificacao(encomenda.getClassificacao());
                encomendaRepository.save(encomendaBanco);
                return  ResponseEntity.ok().build();
            }

            return  ResponseEntity.notFound().build();
        } catch (RuntimeException e) {
            throw new RuntimeException(e);
        }

    }

    @DeleteMapping("/{id}/excluir")
    public ResponseEntity<Void> excluir(@PathVariable Long id){

        Encomenda encomendaBanco = encomendaRepository.findById(id).orElse(null);
        if(encomendaBanco != null ){
            encomendaBanco.setStatusEncomenda(EnumStatusEncomenda.EXCLUIDO);
            encomendaRepository.save(encomendaBanco);
            return  ResponseEntity.ok().build();
        }

        return  ResponseEntity.notFound().build();
    }
}
