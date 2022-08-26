package com.acelerazg.todolist;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Scanner;

public class App {

	public static void main(String[] args) {
		ArrayList<Tarefa> listaDeTarefas = Empacotamento.lerArquivo("dados.dat");
		Scanner sc = new Scanner(System.in);
		
		int menu = -1;
		while (menu != 7) {
			
			mostrarMenu();
			menu = sc.nextInt();

			if (menu == 1) {
				verListaDeTarefas(listaDeTarefas);
			} else if(menu == 2) {
				inserirNovaTarefa(listaDeTarefas);
			} else if(menu == 3) {
				
			} else if(menu == 4) {
				
			} else if(menu == 5) {
				alterarStatusTarefa(listaDeTarefas);
			} else if(menu == 6) {
				deletarTarefa(listaDeTarefas);
			} else if(menu != 7){
				System.out.println("\n#Comando incorreto.\n");
			}
			
		}
		
		Empacotamento.gravarArquivo(listaDeTarefas, "dados.dat");
		System.out.println("Até mais!");
		sc.close();

	}
	
	public static void mostrarMenu() {
		System.out.println("###### TODO List ######\n\nMENU\n1 - ver tarefas;\n2 - Inserir nova tarefa;\n3 - Listar tarefas por Categoria"
				+ "\n4 - Listar tarefas por Status;\n5 - Alterar status da tarefa;\n6 - Deletar tarefa;\n7 - SAIR.");
	}

	public static void verListaDeTarefas(ArrayList<Tarefa> listaDeTarefas) {
		if (listaDeTarefas.isEmpty()) {
			System.out.println("\n\nSem tarefas! Comece o seu Backlog ToDo List inserindo nova tarefa!\n\n");
		} else {
			System.out.println(listaDeTarefas);
		}
	}
	
	public static void inserirNovaTarefa(ArrayList<Tarefa> listaDeTarefas) {
		Tarefa task = null;
		
		String nome;
		String categoria;
		String descricao;
		String dataTermino;
		int nivelPrioridade;
		int status;
		
		Scanner sc = new Scanner(System.in);

		System.out.println("Nome da tarefa: ");
		nome = sc.nextLine();
		System.out.println("Categoria da tarefa: ");
		categoria = sc.nextLine();
		System.out.println("Descricao da tarefa: ");
		descricao = sc.nextLine();
		System.out.println("Data de termino da tarefa (formato \"dd/mm/aaaa\"): ");
		dataTermino = sc.nextLine();
		System.out.println("Nível de prioridade da tarefa (1 a 5): ");
		nivelPrioridade = sc.nextInt();
		sc.nextLine();
		System.out.println("Status: \n1 - To Do\n2 - Doing\n3 - Done");
		status = sc.nextInt();
		
		
		if(status == 1) {
			task = new Tarefa(nome,categoria,descricao,dataTermino,nivelPrioridade,"To Do");
		} else if(status == 2) {
			task = new Tarefa(nome,categoria,descricao,dataTermino,nivelPrioridade,"Doing");
		} else if(status == 3) {
			task = new Tarefa(nome,categoria,descricao,dataTermino,nivelPrioridade,"Done");
		} else {
			System.out.println("Dados incorretos. Tente criar tarefa novamente.");
		}
		listaDeTarefas.add(task);
		Collections.sort(listaDeTarefas);
	}
	
	public static void alterarStatusTarefa(ArrayList<Tarefa> listaDeTarefas) {
		Scanner sc = new Scanner(System.in);
		System.out.println("Tarefas: \n");
		verListaDeTarefas(listaDeTarefas);
		System.out.println("\n\nDigite o nome da tarefa que deseja alterar o status:");
		String nome = sc.nextLine();
		
		for(int i = 0; i < listaDeTarefas.size(); i++){
	        Tarefa p = listaDeTarefas.get(i);

	        if(p.getNome().equalsIgnoreCase(nome)){
	        	System.out.println("Novo status: \n1 - To Do\n2 - Doing\n3 - Done");
	    		int status = sc.nextInt();
	    		
	    		if(status == 1) {
	    			p.setStatus("To Do");
	    			return;
	    		}
	    			
	    		if(status == 2) {
	    			p.setStatus("Doing");
	    			return;
	    		}
	    			
	    		if(status == 3) {
	    			p.setStatus("Done");
	    			return;
	    		}
	    		System.out.println("\nStatus incorreto.\n");	
	        }
	        System.out.println("\nNome incorreto\n");
	    }
	}
	public static void deletarTarefa(ArrayList<Tarefa> listaDeTarefas) {
		Scanner sc = new Scanner(System.in);
		System.out.println("Tarefas: \n");
		verListaDeTarefas(listaDeTarefas);
		System.out.println("\n\nDigite o nome da tarefa que deseja deletar:");
		String nome = sc.nextLine();

		for(int i = 0; i < listaDeTarefas.size(); i++){
	        Tarefa p = listaDeTarefas.get(i);

	        if(p.getNome().equalsIgnoreCase(nome)){
	        	if(listaDeTarefas.remove(p)) {
	        		System.out.println("Deletada!\n");
	        		return;
	        	}
	        }
	    }
		System.out.println("\nNome incorreto\n");
	}

}
