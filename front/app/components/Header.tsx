"use client";

import { useEffect, useState } from "react";

export default function Header() {
  const [email, setEmail] = useState("");

  useEffect(() => {
    const emailSalvo = localStorage.getItem("emailUsuario");

    if (emailSalvo) {
      setEmail(emailSalvo);
    }
  }, []);

  const sair = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("emailUsuario");

    window.location.href = "/login";
  };

  return (
    <header className="w-full bg-white border-b border-pink-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

        {/* Identificação do usuário */}
        <div className="flex items-center space-x-3">

          <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 shadow-inner">
            <span className="text-xl">
              🧁
            </span>
          </div>

          <div>
            <span className="block text-sm font-semibold text-green-900">
              SweetBakery
            </span>

            <span className="block text-xs text-gray-500">
              {email || "Usuário"}
            </span>
          </div>

        </div>

        {/* Botão sair */}
        <button
          type="button"
          onClick={sair}
          className="px-4 py-2 bg-pink-400 hover:bg-pink-500 text-white font-medium text-sm rounded-xl transition-colors duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
        >
          Sair
        </button>

      </div>
    </header>
  );
}
