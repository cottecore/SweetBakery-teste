export type StatusEncomenda =
  | "PREPARANDO"
  | "ENTREGA"
  | "ENTREGUE"
  | "CANCELADO";

export class Encomenda {

  constructor(
    public id: number | null,
    public dataPedido: string,
    public prazo: string,
    public classificacao: string,
    public statusEncomenda: StatusEncomenda
  ) {}

}

export interface EncomendaFormProps {
  encomendaExistente?: Encomenda;
}