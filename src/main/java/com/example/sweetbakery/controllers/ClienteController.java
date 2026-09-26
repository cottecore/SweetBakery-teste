package com.example.sweetbakery.controllers;

import com.example.sweetbakery.entidades.Cliente;
import com.example.sweetbakery.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/cliente")
public class ClienteController {

    @Autowired
    private ClienteRepository clienteRepository;

    @GetMapping
    public ResponseEntity<?> listarTodos(){

        return  ResponseEntity.ok(clienteRepository.findAll());
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<Cliente> criar(@RequestBody Cliente cliente){

        var clienteBanco = clienteRepository.save(cliente);
        return ResponseEntity.ok(clienteBanco);

    }


    @PutMapping("/{id}")
    public ResponseEntity<Cliente> atualizar(@PathVariable Long id, @RequestBody Cliente cliente){

        try{
            Cliente clienteBanco = clienteRepository.findById(id).orElse(null);
            if(clienteBanco != null ){
                clienteBanco.setNome(cliente.getNome());
                clienteRepository.save(clienteBanco);
                return  ResponseEntity.ok().build();
            }

            return  ResponseEntity.notFound().build();
        } catch (RuntimeException e) {
            throw new RuntimeException(e);
        }
    }
}


