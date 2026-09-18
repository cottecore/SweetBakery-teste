package com.example.sweetbakery.controllers;

import com.example.sweetbakery.entidades.Confeiteira;

import com.example.sweetbakery.entidades.Produto;
import com.example.sweetbakery.repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/produto")
public class ProdutoController {

    @Autowired
    private ProdutoRepository ProdutoaRepository;

    @GetMapping
    public ResponseEntity<?> listarTodos(){

        return  ResponseEntity.ok(ProdutoaRepository.findAll());
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<Produto> criar(@RequestBody Produto produto){

        var produtoBanco = ProdutoaRepository.save(produto);
        return ResponseEntity.ok(produtoBanco);

    }
}
