"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { LoginResponse } from "../types/auth";

export default function Login() {
  const router = useRouter();

  const handleLogin = async (formData: FormData) => {
    const email = formData.get("email")?.toString() ?? "";
    const senha = formData.get("senha")?.toString() ?? "";

    if (!email || !senha) {
      alert("Informe o e-mail e a senha.");
      return;
    }

    try {
      const resposta = await axios.post<LoginResponse>(
        "http://localhost:8080/auth/login",
        {
          email,
          senha,
        }
      );

      if (resposta.status === 200) {
        localStorage.setItem("token", resposta.data.token);
        localStorage.setItem("emailUsuario", email);

        router.push("/home");
      }
    } catch (error) {
      alert("E-mail ou senha inválidos.");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-white to-green-50 px-4">

      <div className="w-full max-w-md bg-white border border-pink-100 rounded-3xl shadow-xl p-8">

        <div className="text-center mb-8">

          <div className="w-20 h-20 mx-auto rounded-full bg-pink-100 flex items-center justify-center text-4xl mb-4">
            🧁
          </div>

          <h1 className="text-3xl font-bold text-green-950">
            Sweet<span className="text-pink-500">Bakery</span>
          </h1>

          <p className="text-sm text-gray-500 mt-2">
            Entre para acessar o sistema
          </p>

        </div>

        <form action={handleLogin} className="space-y-5">

          <div>
            <label className="block text-sm font-semibold text-green-900 mb-2">
              E-mail
            </label>

            <input
              name="email"
              type="email"
              required
              placeholder="seu@email.com"
              className="w-full px-4 py-3 bg-pink-50 border border-pink-100 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-green-900 mb-2">
              Senha
            </label>

            <input
              name="senha"
              type="password"
              required
              placeholder="Digite sua senha"
              className="w-full px-4 py-3 bg-pink-50 border border-pink-100 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl shadow-md transition"
          >
            Entrar
          </button>

        </form>

        <div className="text-center mt-6">
          <p className="text-xs text-gray-500">
            Sistema de Controle de Encomendas
          </p>
        </div>

      </div>

    </main>
  );
}