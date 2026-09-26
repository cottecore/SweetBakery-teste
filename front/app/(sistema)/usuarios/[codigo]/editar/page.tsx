"use client";

import { Usuario } from "@/app/types/usuario";
import axios from "axios";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import UsuarioForm from "../../components/UsuarioForm";

export default function EditarUsuario() {
  const parametro = useParams();
  const codigo = Number(parametro.codigo);

  const [usuario, setUsuario] = useState<Usuario | null>(null);

  const router = useRouter();

  useEffect(() => {
    buscarDados();
  }, []);

  const buscarDados = async () => {
    try {
      const token = localStorage.getItem("token");

      const resposta = await axios.get<Usuario>(
        `http://localhost:8080/usuarios/${codigo}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (resposta.status === 200) {
        setUsuario(resposta.data);
      }
    } catch {
      router.push("/usuarios");
    }
  };

  if (!usuario) {
    return (
      <div className="p-8 text-green-900">
        Carregando dados...
      </div>
    );
  }

  return (
    <div className="space-y-6">

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-gradient-to-r from-green-700 to-green-600 p-6 rounded-3xl shadow-lg">

        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            👩‍🍳 Editar confeiteira
          </h1>

          <p className="text-sm text-green-100 mt-1">
            Atualize os dados da confeiteira.
          </p>
        </div>

        <Link
          href="/usuarios"
          className="inline-flex items-center justify-center text-sm font-medium text-green-900 bg-white hover:bg-pink-50 px-4 py-2.5 rounded-xl transition shadow-sm"
        >
          &larr; Voltar
        </Link>

      </div>

      <div className="bg-white border border-pink-100 rounded-3xl p-6 md:p-8 shadow-lg">
        <UsuarioForm usuarioExistente={usuario} />
      </div>

    </div>
  );
}