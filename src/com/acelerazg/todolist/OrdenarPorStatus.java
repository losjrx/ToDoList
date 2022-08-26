package com.acelerazg.todolist;

import java.util.Comparator;

public class OrdenarPorStatus implements Comparator<Tarefa>{
	
	@Override
	public int compare(Tarefa a, Tarefa b) {
		return a.getStatus().compareTo(b.getStatus()); 
	}
}
