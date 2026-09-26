export default function Footer() {
    const anoAtual = new Date().getFullYear();
  
    return (
      <footer className="w-full bg-green-950 border-t border-green-900 py-6 px-4">
        <div className="max-w-7xl mx-auto text-center">
  
          <p className="text-sm font-medium text-green-200">
            © {anoAtual}{" "}
            <span className="text-pink-300 font-bold">
              SweetBakery
            </span>
            . Todos os direitos reservados.
          </p>
  
          <p className="text-xs text-green-400 mt-1">
            Controle de Encomendas de Confeitaria
          </p>
  
        </div>
      </footer>
    );
  }