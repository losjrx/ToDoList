package com.acelerazg.todolist;

import java.util.Comparator;

public class OrdenarPorCategoria implements Comparator<Tarefa> {

	@Override
	public int compare(Tarefa a, Tarefa b) {
		return a.getCategoria().compareTo(b.getCategoria()); 
	}

}
