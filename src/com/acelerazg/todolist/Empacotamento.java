package com.acelerazg.todolist;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

public class Empacotamento {
public static void gravarArquivo(LinkedList<Tarefa> lista, String arquivo) {
		
		File arq = new File(arquivo);
		
		arq.delete();
		try {
			arq.createNewFile();
			
			ObjectOutputStream obj = new ObjectOutputStream(new FileOutputStream(arq));
			obj.writeObject(lista);
			obj.close();
			
		} catch (IOException e) {
			System.out.println("Erro na gravação do arquivo.");
		}
	}
	
	public static LinkedList<Tarefa> lerArquivo(String arquivo){
		LinkedList<Tarefa> lista = new LinkedList<Tarefa>();
		
		File arq = new File(arquivo);
		if(arq.exists()) {
			try {
				ObjectInputStream obj = new ObjectInputStream(new FileInputStream(arq));
				try {
					lista = (LinkedList<Tarefa>) obj.readObject();
				} catch (ClassNotFoundException e) {
					System.out.println("Erro " + e.getMessage());
				}
				obj.close();
				
			} catch (FileNotFoundException e) {
				System.out.println("Erro " + e.getMessage());
			} catch (IOException e) {
				System.out.println("Erro " + e.getMessage());
			}
		}
		return lista;
	}
}
