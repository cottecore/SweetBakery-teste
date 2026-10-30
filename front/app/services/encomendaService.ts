import { Encomenda } from "../types/encomenda";
import api from "./api";

export async function buscarListaEncomenda() : Promise<Encomenda[]> {

    const dados = await api.get<Encomenda[]>("http://localhost:8080/encomenda");

    if(dados.status == 200){
        return dados.data;
    }

    return [];
    
}

/*export async function deletarEncomenda(id:number) : Promise<number>{

    var dados = await api.delete('http://localhost:8080/encomenda/'+id+'/excluir');
       return dados.status;
   }
   
      
   export async function atualizarStatusEncomenda(encomenda:Encomenda) :Promise<void>{
      
       var novoStatus = {};
       if(encomenda.status ==="ATIVO"){
           novoStatus = {status:"BLOQUEADO"}
       }else{
           novoStatus = {status:"ATIVO"}
       }
   
       var dadosRetorno = await  
       api.patch('http://localhost:8080/encomenda/'+encomenda.id+'/status',novoStatus);
   
       if(dadosRetorno.status==200){
           alert("Atulizado status com sucesso!");
       }else{
           alert(dadosRetorno.data);
   
           return;
       } 
   }*/


export async function consultaEncomendaPorId(id:number):Promise<Encomenda>{
    const valorEncomendaBack = await api.get<Encomenda>('http://localhost:8080/encomenda/'+id);
    return valorEncomendaBack.data;

}

/*
export async function  atualizarEncomenda (encomenda:Encomenda): Promise<number>{
    var dadosRetorno = await  
    api.put<number>('http://localhost:8080/encomenda/'+encomenda.id,encomenda);
    return dadosRetorno.data;
}


export async function  salvarEncomenda (encomenda:Encomenda): Promise<number>{
    var dadosRetorno = await  
    api.post<number>('http://localhost:8080/encomenda',encomenda);
    return dadosRetorno.data;
}*/