package com.example.sweetbakery.dtos;

import com.example.sweetbakery.entidades.EnumStatusEncomenda;
import com.example.sweetbakery.entidades.EnumStatusProduto;
import com.example.sweetbakery.entidades.EnumStatusUsuario;

public record AtualizarStatusRequest(EnumStatusUsuario status, EnumStatusProduto statusProduto, EnumStatusEncomenda statusEncomenda) {
}
