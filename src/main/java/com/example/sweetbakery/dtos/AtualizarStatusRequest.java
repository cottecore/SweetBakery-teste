package com.example.sweetbakery.dtos;


import com.example.sweetbakery.domain.entidades.EnumStatusEncomenda;
import com.example.sweetbakery.domain.entidades.EnumStatusProduto;
import com.example.sweetbakery.domain.entidades.EnumStatusUsuario;

public record AtualizarStatusRequest(EnumStatusUsuario status, EnumStatusProduto statusProduto, EnumStatusEncomenda statusEncomenda) {
}
