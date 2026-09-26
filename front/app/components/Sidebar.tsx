"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const menu = [
    {
      nome: "Dashboard",
      caminho: "/home",
      icone: "🏠",
    },
    {
      nome: "Cliente",
      caminho: "/cliente",
      icone: "👤",
    },
    {
      nome: "Confeiteiras",
      caminho: "/usuarios",
      icone: "👩‍🍳",
    },
    {
      nome: "Produtos",
      caminho: "/produtos",
      icone: "🧁",
    },
    {
      nome: "Encomendas",
      caminho: "/encomendas",
      icone: "📦",
    },
  ];

  return (
    <aside className="hidden md:flex w-64 min-h-screen bg-green-950 text-white flex-col">

      <div className="p-6 border-b border-green-800">
        <Link href="/home" className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-pink-400 flex items-center justify-center text-2xl">
            🧁
          </div>

          <div>
            <h1 className="font-bold text-lg">
              Sweet<span className="text-pink-300">Bakery</span>
            </h1>

            <p className="text-xs text-green-300">
              Painel de controle
            </p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-2">

        {menu.map((item) => {
          const ativo = pathname === item.caminho;

          return (
            <Link
              key={item.caminho}
              href={item.caminho}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                ativo
                  ? "bg-pink-400 text-white shadow-md"
                  : "text-green-100 hover:bg-green-800"
              }`}
            >
              <span className="text-xl">
                {item.icone}
              </span>

              <span className="font-medium">
                {item.nome}
              </span>
            </Link>
          );
        })}

      </nav>

      <div className="p-4 border-t border-green-800">
        <p className="text-xs text-green-400 text-center">
          SweetBakery © {new Date().getFullYear()}
        </p>
      </div>

    </aside>
  );
}