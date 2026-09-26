"use client";

import {
  Usuario,
  UsuarioFormProps,
  TipoUsuario,
} from "@/app/types/usuario";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function UsuarioForm({
  usuarioExistente,
}: UsuarioFormProps) {
  const router = useRouter();

  const [usuario, setUsuario] = useState<Usuario>(
    usuarioExistente ||
      new Usuario(
        null,
        "",
        "",
        "ATIVO",
        "",
        "",
        "CONFEITEIRA"
      )
  );

  const [carregando, setCarregando] = useState(false);

  const handlerChange = (
    campo: "nome" | "email" | "cpf" | "senha",
    valor: string
  ) => {
    setUsuario((anterior) => {
      return new Usuario(
        anterior.id,
        campo === "nome" ? valor : anterior.nome,
        campo === "email" ? valor : anterior.email,
        anterior.status,
        campo === "cpf" ? valor : anterior.cpf,
        campo === "senha" ? valor : anterior.senha,
        anterior.tipo
      );
    });
  };

  const alterarTipo = (tipo: TipoUsuario) => {
    setUsuario((anterior) => {
      return new Usuario(
        anterior.id,
        anterior.nome,
        anterior.email,
        anterior.status,
        anterior.cpf,
        anterior.senha,
        tipo
      );
    });
  };

  const handlerSalvar = async () => {
    setCarregando(true);

    try {
      /*
       * =====================================
       * EDITAR CONFEITEIRA
       * =====================================
       */
      if (usuarioExistente) {
        const token = localStorage.getItem("token");

        const resposta = await axios.put(
          `http://localhost:8080/usuarios/${usuario.id}`,
          {
            id: usuario.id,
            nome: usuario.nome,
            cpf: usuario.cpf,
            email: usuario.email,
            senha: usuario.senha,
            status: usuario.status,
          },
          token
            ? {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            : undefined
        );

        if (resposta.status === 200) {
          alert("Confeiteira atualizada com sucesso!");
          router.push("/usuarios");
        }

        return;
      }

      /*
       * =====================================
       * CADASTRAR CLIENTE
       * =====================================
       */
      if (usuario.tipo === "CLIENTE") {
        const resposta = await axios.post(
          "http://localhost:8080/cliente",
          {
            nome: usuario.nome,
            cpf: usuario.cpf,
            email: usuario.email,
            senha: usuario.senha,
            status: "ATIVO",
          }
        );

        if (
          resposta.status === 200 ||
          resposta.status === 201
        ) {
          alert("Cliente cadastrado com sucesso!");
          router.push("/cliente");
        }

        return;
      }

      /*
       * =====================================
       * CADASTRAR CONFEITEIRA
       * =====================================
       *
       * IMPORTANTE:
       * O Swagger mostrou que este endpoint
       * funciona sem Authorization.
       *
       * Portanto NÃO estamos enviando token aqui.
       */
      const resposta = await axios.post(
        "http://localhost:8080/usuarios",
        {
          nome: usuario.nome,
          cpf: usuario.cpf,
          senha: usuario.senha,
          email: usuario.email,
          status: "ATIVO",
        }
      );

      if (
        resposta.status === 200 ||
        resposta.status === 201
      ) {
        alert("Confeiteira cadastrada com sucesso!");
        router.push("/usuarios");
      }

    } catch (error: any) {
      console.error("=================================");
      console.error("ERRO AO SALVAR CADASTRO");
      console.error("=================================");

      if (error.response) {
        console.error("Status:", error.response.status);
        console.error("Resposta:", error.response.data);

        if (error.response.status === 400) {
          alert(
            typeof error.response.data === "string"
              ? error.response.data
              : "Os dados informados são inválidos."
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
            "O servidor encontrou um erro ao processar o cadastro."
          );
        } else {
          alert(
            "Não foi possível salvar o cadastro."
          );
        }

      } else if (error.request) {
        /*
         * Se cair aqui, o navegador não conseguiu
         * obter uma resposta do backend.
         *
         * Pode ser CORS ou backend indisponível.
         */
        console.error(
          "A requisição foi enviada, mas não houve resposta."
        );

        alert(
          "O navegador não conseguiu receber uma resposta do servidor. Verifique se o backend está rodando e se o CORS está configurado."
        );

      } else {
        console.error("Erro:", error.message);

        alert(
          "Ocorreu um erro ao salvar o cadastro."
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

      {/* =====================================
          TIPO DE CADASTRO
      ===================================== */}
      {!usuarioExistente && (
        <div className="space-y-3">

          <label className="block text-sm font-semibold text-green-900">
            Tipo de cadastro
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            {/* CONFEITEIRA */}
            <button
              type="button"
              onClick={() =>
                alterarTipo("CONFEITEIRA")
              }
              className={`p-5 rounded-2xl border text-left transition ${
                usuario.tipo === "CONFEITEIRA"
                  ? "border-green-500 bg-green-50 ring-2 ring-green-200"
                  : "border-gray-200 bg-white hover:bg-green-50"
              }`}
            >
              <div className="text-3xl mb-2">
                👩‍🍳
              </div>

              <h3 className="font-bold text-green-900">
                Confeiteira
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                Gerencia produtos e encomendas.
              </p>
            </button>

            {/* CLIENTE */}
            <button
              type="button"
              onClick={() =>
                alterarTipo("CLIENTE")
              }
              className={`p-5 rounded-2xl border text-left transition ${
                usuario.tipo === "CLIENTE"
                  ? "border-pink-400 bg-pink-50 ring-2 ring-pink-200"
                  : "border-gray-200 bg-white hover:bg-pink-50"
              }`}
            >
              <div className="text-3xl mb-2">
                👤
              </div>

              <h3 className="font-bold text-pink-900">
                Cliente
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                Realiza e acompanha encomendas.
              </p>
            </button>

          </div>
        </div>
      )}

      {/* =====================================
          CAMPOS
      ===================================== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* NOME */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-green-900">
            Nome completo
          </label>

          <input
            name="nome"
            value={usuario.nome}
            required
            onChange={(e) =>
              handlerChange(
                "nome",
                e.target.value
              )
            }
            placeholder="Nome completo"
            className="w-full px-4 py-3 bg-green-50 border border-green-100 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-300"
          />
        </div>

        {/* CPF */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-green-900">
            CPF
          </label>

          <input
            name="cpf"
            value={usuario.cpf}
            required
            onChange={(e) =>
              handlerChange(
                "cpf",
                e.target.value
              )
            }
            placeholder="000.000.000-00"
            className="w-full px-4 py-3 bg-green-50 border border-green-100 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-300"
          />
        </div>

        {/* EMAIL */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-green-900">
            E-mail
          </label>

          <input
            name="email"
            type="email"
            value={usuario.email}
            required
            onChange={(e) =>
              handlerChange(
                "email",
                e.target.value
              )
            }
            placeholder="email@exemplo.com"
            className="w-full px-4 py-3 bg-green-50 border border-green-100 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-300"
          />
        </div>

        {/* SENHA */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-green-900">
            Senha
          </label>

          <input
            name="senha"
            type="password"
            value={usuario.senha}
            required
            onChange={(e) =>
              handlerChange(
                "senha",
                e.target.value
              )
            }
            placeholder="Digite uma senha"
            className="w-full px-4 py-3 bg-green-50 border border-green-100 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-300"
          />
        </div>

      </div>

      {/* =====================================
          BOTÕES
      ===================================== */}
      <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-3 pt-6 border-t border-pink-100">

        <Link
          href="/usuarios"
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
            ? "Salvando..."
            : usuarioExistente
            ? "Salvar alterações"
            : "Salvar cadastro"}
        </button>

      </div>

    </form>
  );
}
