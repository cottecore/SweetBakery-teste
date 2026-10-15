package com.example.sweetbakery.domain.valueobject;

public class CPF {
    private String cpf;

    public CPF(){
        this.cpf = "";
    }

    public CPF(String cpf){
        this.cpf = cpf;
    }

    //prgar o do sor
    @Override
    public String toString(){
        return cpf.replaceAll("\\D","");
    }
}
