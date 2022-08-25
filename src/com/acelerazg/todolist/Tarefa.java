package com.acelerazg.todolist;

import java.io.Serializable;

public class Tarefa implements Serializable,Comparable<Tarefa>{
	
	private static final long serialVersionUID = 782148435435790745L;
	private int id;
	private String nome;
	private String categoria;
	private String descricao;
	private String dataTermino;
	private int nivelPrioridade;
	private String status;

    public Tarefa(int id, String nome, String categoria, String descricao, String dataTermino, int nivelPrioridade, String status) {
        this.id = id;
    	this.nome = nome;
        this.categoria = categoria;
        this.descricao = descricao;
        this.dataTermino = dataTermino;
        this.nivelPrioridade = nivelPrioridade;
        this.status = status;
    }

    public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getDataTermino() {
        return dataTermino;
    }

    public void setDataTermino(String dataTermino) {
        this.dataTermino = dataTermino;
    }

    public int getNivelPrioridade() {
        return nivelPrioridade;
    }

    public void setNivelPrioridade(int nivelPrioridade) {
        this.nivelPrioridade = nivelPrioridade;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

	@Override
	public String toString() {
		return "\n> Tarefa [id=" + id + ", nome=" + nome + ", categoria=" + categoria + ", descricao=" + descricao
				+ ", dataTermino=" + dataTermino + ", nivelPrioridade=" + nivelPrioridade + ", status=" + status + "]" + "\n";
	}

	@Override
	public int compareTo(Tarefa o) {
		if(this.nivelPrioridade < o.nivelPrioridade) {
			return 1;
		} else if(this.nivelPrioridade > o.nivelPrioridade) {
			return -1;
		}
		return 0;
	}
}
