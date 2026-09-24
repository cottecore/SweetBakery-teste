package com.example.sweetbakery.controllers;

import com.example.sweetbakery.dtos.AtualizarStatusRequest;

import com.example.sweetbakery.entidades.EnumStatusProduto;
import com.example.sweetbakery.entidades.EnumStatusUsuario;
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
    private ProdutoRepository produtoRepository;

    @GetMapping
    public ResponseEntity<?> listarTodos(){

        return  ResponseEntity.ok(produtoRepository.findAll());
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<Produto> criar(@RequestBody Produto produto){

        var produtoBanco = produtoRepository.save(produto);
        return ResponseEntity.ok(produtoBanco);

    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<Void> atualizarStatus(@PathVariable Long id, @RequestBody AtualizarStatusRequest statusRequest) {

        Produto produtoBanco = produtoRepository.findById(id).orElse(null);
        if (produtoBanco != null) {
            produtoBanco.setStatusProduto(statusRequest.statusProduto());
            produtoRepository.save(produtoBanco);
            return ResponseEntity.ok().build();
        }

        return ResponseEntity.notFound().build();

    }

    @PutMapping("/{id}")
    public ResponseEntity<Produto> atualizar(@PathVariable Long id, @RequestBody Produto produto){

        try{
            Produto produtoBanco = produtoRepository.findById(id).orElse(null);
            if(produtoBanco!= null ){
                produtoBanco.setStatusProduto(produto.getStatusProduto());
                produtoBanco.setId(produto.getId());
                produtoRepository.save(produtoBanco);
                return  ResponseEntity.ok().build();
            }

            return  ResponseEntity.notFound().build();
        } catch (RuntimeException e) {
            throw new RuntimeException(e);
        }

    }

    @DeleteMapping("/{id}/excluir")
    public ResponseEntity<Void> excluir(@PathVariable Long id){

        Produto produtoBanco = produtoRepository.findById(id).orElse(null);
        if(produtoBanco != null ){
            produtoBanco.setStatusProduto(EnumStatusProduto.EXCLUIDO);
            produtoRepository.save(produtoBanco);
            return  ResponseEntity.ok().build();
        }

        return  ResponseEntity.notFound().build();
    }

}
