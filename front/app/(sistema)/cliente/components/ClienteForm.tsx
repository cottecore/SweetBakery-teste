"use client";

import {
  Cliente,
  ClienteFormProps,
} from "@/app/types/cliente";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function   ClienteForm({
  clienteExistente,
}: ClienteFormProps) {

  const router = useRouter();

  const [cliente, setCliente] = useState<Cliente>(
    clienteExistente ||
      new Cliente(
        null,
        ""
      )
  );

  const [carregando, setCarregando] = useState(false);

  const handlerSalvar = async () => {

    setCarregando(true);

    try {

      /*
       * ============================
       * CADASTRAR CLIENTE
       * ============================
       */

      const resposta = await axios.post(
        "http://localhost:8080/cliente",
        {
          nome: cliente.nome,
        }
      );

      if (
        resposta.status === 200 ||
        resposta.status === 201
      ) {

        alert("Cliente cadastrado com sucesso!");

        router.push("/cliente");
      }

    } catch (error: any) {

      console.error("=================================");
      console.error("ERRO AO CADASTRAR CLIENTE");
      console.error("=================================");

      if (error.response) {

        console.error(
          "Status:",
          error.response.status
        );

        console.error(
          "Resposta:",
          error.response.data
        );

        if (error.response.status === 400) {

          alert(
            typeof error.response.data === "string"
              ? error.response.data
              : "O nome informado é inválido."
          );

        } else if (error.response.status === 401) {

          alert(
            "Você não está autorizado a realizar esta operação."
          );

        } else if (error.response.status === 403) {

          alert(
            "Acesso negado pelo servidor."
          );

        } else if (error.response.status === 500) {

          alert(
            "O servidor encontrou um erro ao cadastrar o cliente."
          );

        } else {

          alert(
            "Não foi possível cadastrar o cliente."
          );
        }

      } else if (error.request) {

        console.error(
          "A requisição foi enviada, mas não houve resposta."
        );

        alert(
          "Não foi possível conectar ao servidor. Verifique se o backend está rodando."
        );

      } else {

        console.error(
          "Erro:",
          error.message
        );

        alert(
          "Ocorreu um erro ao cadastrar o cliente."
        );
      }

    } finally {

      setCarregando(false);

    }
  };

  return (
    <form
      action={handlerSalvar}
      className="space-y-6"
    >

      {/* ============================
          NOME DO CLIENTE
      ============================ */}

      <div className="space-y-2">

        <label className="block text-sm font-semibold text-green-900">
          Nome do cliente
        </label>

        <input
          name="nome"
          value={cliente.nome}
          required
          onChange={(e) =>
            setCliente(
              new Cliente(
                cliente.id,
                e.target.value
              )
            )
          
          }
          placeholder="Digite o nome do cliente"
          className="w-full px-4 py-3 bg-green-50 border border-green-100 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-300"
        />

      </div>

      {/* ============================
          BOTÕES
      ============================ */}

      <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-3 pt-6 border-t border-pink-100">

        <Link
          href="/cliente"
          className="px-5 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium text-sm rounded-xl transition text-center"
        >
          Cancelar
        </Link>

        <button
          type="submit"
          disabled={carregando}
          className="px-6 py-3 bg-pink-400 hover:bg-pink-500 disabled:bg-pink-200 text-white font-semibold text-sm rounded-xl shadow-md transition"
        >
          {carregando
            ? "Cadastrando..."
            : "Cadastrar cliente"}
        </button>

      </div>

    </form>
  );
}
