package com.example.sweetbakery.controllers;

import com.example.sweetbakery.dtos.AtualizarStatusRequest;
import com.example.sweetbakery.entidades.Encomenda;
import com.example.sweetbakery.entidades.EnumStatusEncomenda;
import com.example.sweetbakery.repository.EncomendaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.temporal.ChronoUnit;

@RestController
@RequestMapping("/encomenda")
public class EncomendaController {

    @Autowired
    private EncomendaRepository encomendaRepository;

    @GetMapping
    public ResponseEntity<?> listarTodos() {
        return ResponseEntity.ok(encomendaRepository.findAll());
    }

    @PostMapping
    public ResponseEntity<?> criar(@RequestBody Encomenda encomenda) {

        if (encomenda.getDataPedido() == null) {
            return ResponseEntity.badRequest()
                    .body("A data do pedido é obrigatória.");
        }

        if (encomenda.getPrazo() == null) {
            return ResponseEntity.badRequest()
                    .body("O prazo de entrega é obrigatório.");
        }

        if (encomenda.getClassificacao() == null ||
                encomenda.getClassificacao().isBlank()) {
            return ResponseEntity.badRequest()
                    .body("A classificação é obrigatória.");
        }

        if (encomenda.getClassificacao().equalsIgnoreCase("FESTA")) {

            long dias = ChronoUnit.DAYS.between(
                    encomenda.getDataPedido(),
                    encomenda.getPrazo()
            );

            if (dias < 3) {
                return ResponseEntity.badRequest()
                        .body("Encomendas classificadas como FESTA devem ter prazo de pelo menos 3 dias após a data do pedido.");
            }
        }

        if (encomenda.getStatusEncomenda() == null) {
            encomenda.setStatusEncomenda(
                    EnumStatusEncomenda.PREPARANDO
            );
        }

        Encomenda encomendaBanco =
                encomendaRepository.save(encomenda);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(encomendaBanco);
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<?> atualizarStatus(
            @PathVariable Long id,
            @RequestBody AtualizarStatusRequest statusRequest) {

        Encomenda encomendaBanco =
                encomendaRepository.findById(id).orElse(null);

        if (encomendaBanco == null) {
            return ResponseEntity.notFound().build();
        }

        encomendaBanco.setStatusEncomenda(
                statusRequest.statusEncomenda()
        );

        encomendaRepository.save(encomendaBanco);

        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> atualizar(
            @PathVariable Long id,
            @RequestBody Encomenda encomenda) {

        Encomenda encomendaBanco =
                encomendaRepository.findById(id).orElse(null);

        if (encomendaBanco == null) {
            return ResponseEntity.notFound().build();
        }

        // Não permite alterar uma encomenda já entregue
        if (encomendaBanco.getStatusEncomenda()
                == EnumStatusEncomenda.ENTREGUE) {

            return ResponseEntity.badRequest()
                    .body("Não é possível alterar uma encomenda já entregue.");
        }

        if (encomenda.getClassificacao().equalsIgnoreCase("FESTA")) {

            long dias = ChronoUnit.DAYS.between(
                    encomenda.getDataPedido(),
                    encomenda.getPrazo()
            );

            if (dias < 3) {
                return ResponseEntity.badRequest()
                        .body("Encomendas classificadas como FESTA devem ter prazo de pelo menos 3 dias após a data do pedido.");
            }
        }

        encomendaBanco.setDataPedido(encomenda.getDataPedido());
        encomendaBanco.setPrazo(encomenda.getPrazo());
        encomendaBanco.setClassificacao(encomenda.getClassificacao());

        encomendaRepository.save(encomendaBanco);

        return ResponseEntity.ok(encomendaBanco);
    }

    @DeleteMapping("/{id}/excluir")
    public ResponseEntity<?> excluir(@PathVariable Long id) {

        Encomenda encomendaBanco =
                encomendaRepository.findById(id).orElse(null);

        if (encomendaBanco == null) {
            return ResponseEntity.notFound().build();
        }

        if (encomendaBanco.getStatusEncomenda()
                == EnumStatusEncomenda.ENTREGUE) {

            return ResponseEntity.badRequest()
                    .body("Não é possível cancelar uma encomenda já entregue.");
        }

        encomendaBanco.setStatusEncomenda(
                EnumStatusEncomenda.CANCELADO
        );

        encomendaRepository.save(encomendaBanco);

        return ResponseEntity.ok().build();
    }
}