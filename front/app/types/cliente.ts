
export class Cliente {
  constructor(
    public id: number | null,
    public nome: string
  ) {}
}

export interface ClienteFormProps {
  clienteExistente?: Cliente;
}