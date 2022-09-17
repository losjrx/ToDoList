document.getElementById("logotipo").onclick = function () {
	document.querySelector(".inserir_tarefa").style.display = "block";
	document.getElementById("logo").height = "100";
	document.getElementById("logo").width = "100";
	document.querySelector(".tabelas").style.display = "flex";
};

class Tarefa {
	constructor(tarefa,categoria,descricao,prioridade,dataLimite){
		this.tarefa = tarefa;
		this.categoria = categoria;
		this.descricao = descricao;
		this.prioridade = prioridade;
		this.dataLimite = new Date(dataLimite);
		this.dataTermino = "";
	}
}

function insereTarefaTODO(tarefa){
	
	var toDo = "";
	if(tarefa){
		toDo += "<tr>";
		toDo += "<td>" + tarefa.tarefa + "</td>";
		toDo += "<td>" + tarefa.categoria + "</td>";
		toDo += "<td>" + tarefa.descricao + "</td>";
		toDo += "<td>" + tarefa.prioridade + "</td>";
		toDo += "<td>" + tarefa.dataLimite.toLocaleDateString() + "</td>";
		toDo += "</tr>"; 
	}

	document.getElementById("dados-TODO").innerHTML += toDo;
}

document.getElementById("criar_tarefa").onclick = function(){
	var tarefa = document.getElementById("nome_tarefa").value;
	var categoria = document.getElementById("categoria_tarefa").value;
	var descricao = document.getElementById("descrição_tarefa").value;
	var dataLimite = document.getElementById("data_deadline").value;

		var campo_select = document.getElementById("prioridades");
		var indice_selecionado = campo_select.options.selectedIndex;

	var prioridade = campo_select.options[indice_selecionado].innerHTML;

	var tarefinha = new Tarefa(tarefa, categoria, descricao, prioridade, dataLimite);

	insereTarefaTODO(tarefinha);

	document.querySelector('.tabelaTODO').style.display = "flex";

};