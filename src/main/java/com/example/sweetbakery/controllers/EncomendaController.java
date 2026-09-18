package com.example.sweetbakery.controllers;

import com.example.sweetbakery.entidades.Encomenda;
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
}
