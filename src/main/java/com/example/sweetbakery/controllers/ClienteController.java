package com.example.sweetbakery.controllers;

import com.example.sweetbakery.dtos.AtualizarStatusRequest;
import com.example.sweetbakery.entidades.Cliente;
import com.example.sweetbakery.entidades.EnumStatusUsuario;
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

    @PatchMapping("/{id}/status")
    public ResponseEntity<Void> atualizarStatus(@PathVariable Long id, @RequestBody AtualizarStatusRequest statusRequest) {

        Cliente clienteBanco = clienteRepository.findById(id).orElse(null);
        if (clienteBanco != null) {
            clienteBanco.setStatus(statusRequest.status());
            clienteRepository.save(clienteBanco);
            return ResponseEntity.ok().build();
        }

        return ResponseEntity.notFound().build();

    }

    @PutMapping("/{id}")
    public ResponseEntity<Cliente> atualizar(@PathVariable Long id, @RequestBody Cliente cliente){

        try{
            Cliente clienteBanco = clienteRepository.findById(id).orElse(null);
            if(clienteBanco != null ){
                clienteBanco.setStatus(cliente.getStatus());
                clienteBanco.setNome(cliente.getNome());
                clienteBanco.setCpf(cliente.getCpf());
                clienteBanco.setEmail(cliente.getEmail());
                clienteBanco.setSenha(cliente.getSenha());
                clienteRepository.save(clienteBanco);
                return  ResponseEntity.ok().build();
            }

            return  ResponseEntity.notFound().build();
        } catch (RuntimeException e) {
            throw new RuntimeException(e);
        }
    }

    @DeleteMapping("/{id}/excluir")
    public ResponseEntity<Void> excluir(@PathVariable Long id){

        Cliente clienteBanco = clienteRepository.findById(id).orElse(null);
        if(clienteBanco != null ){
            clienteBanco.setStatus(EnumStatusUsuario.EXCLUIDO);
            clienteRepository.save(clienteBanco);
            return  ResponseEntity.ok().build();
        }

        return  ResponseEntity.notFound().build();
    }

}
