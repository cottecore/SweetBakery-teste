"use client";

import { Cliente } from "@/app/types/cliente";
import axios from "axios";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ClienteForm from "../../components/ClienteForm";

export default function EditarCliente() {

  const parametro = useParams();
  const codigo = Number(parametro.codigo);

  const [cliente, setCliente] = useState<Cliente | null>(null);

  const router = useRouter();

  useEffect(() => {
    buscarDados();
  }, []);

  const buscarDados = async () => {

    try {

      const resposta = await axios.get<Cliente>(
        `http://localhost:8080/cliente/${codigo}`
      );

      if (resposta.status === 200) {
        setCliente(resposta.data);
      }

    } catch (error) {

      console.error(
        "Erro ao buscar cliente:",
        error
      );

      router.push("/cliente");
    }
  };

  if (!cliente) {
    return (
      <div className="p-8 text-green-900">
        Carregando dados...
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* ============================
          CABEÇALHO
      ============================ */}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-gradient-to-r from-green-700 to-green-600 p-6 rounded-3xl shadow-lg">

        <div>

          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            👤 Editar cliente
          </h1>

          <p className="text-sm text-green-100 mt-1">
            Atualize o nome do cliente.
          </p>

        </div>

        <Link
          href="/cliente"
          className="inline-flex items-center justify-center text-sm font-medium text-green-900 bg-white hover:bg-pink-50 px-4 py-2.5 rounded-xl transition shadow-sm"
        >
          &larr; Voltar
        </Link>

      </div>

      {/* ============================
          FORMULÁRIO
      ============================ */}

      <div className="bg-white border border-pink-100 rounded-3xl p-6 md:p-8 shadow-lg">

        <ClienteForm
          clienteExistente={cliente}
        />

      </div>

    </div>
  );
}
